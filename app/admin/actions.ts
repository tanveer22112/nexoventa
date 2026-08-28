"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession, getAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function loginAdmin(formData: FormData) {
  const parsed = z.object({ email: z.string().trim().email(), password: z.string().min(1) }).safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) redirect("/admin/login?error=invalid");
  const email = parsed.data.email.toLowerCase();
  const password = parsed.data.password;
  const user = await db.user.findUnique({ where: { email } });
  if (!user || user.role !== "ADMIN" || !verifyPassword(password, user.passwordHash)) redirect("/admin/login?error=invalid");
  await createAdminSession(user.id);
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function updateApplicationStatus(formData: FormData) {
  await requireMutation();
  const parsed = z.object({ id: z.string().min(1), status: z.enum(["PENDING", "CONFIRMED", "REJECTED", "CANCELLED", "WAITLISTED"]) }).safeParse({ id: formData.get("id"), status: formData.get("status") });
  if (!parsed.success) return;

  const { id, status } = parsed.data;
  try {
    await db.$transaction(async (tx) => {
      const application = await tx.application.findUnique({ where: { id }, include: { batch: true } });
      if (!application) return;

      const nextStatus = status;
      const releasing = application.seatStatus === "RESERVED" && ["REJECTED", "CANCELLED"].includes(nextStatus);
      const reserving = application.seatStatus === "RELEASED" && ["PENDING", "CONFIRMED"].includes(nextStatus);

      if (reserving) {
        const updated = await tx.batch.updateMany({
          where: { id: application.batchId, reservedSeats: { lt: application.batch.capacity } },
          data: { reservedSeats: { increment: 1 } },
        });
        if (updated.count !== 1) throw new Error("BATCH_FULL");
      }

      if (releasing) {
        await tx.batch.updateMany({
          where: { id: application.batchId, reservedSeats: { gt: 0 } },
          data: { reservedSeats: { decrement: 1 } },
        });
      }

      if (nextStatus === "CONFIRMED" && application.seatStatus === "RESERVED" && application.batch.reservedSeats > application.batch.capacity) {
        throw new Error("BATCH_INCONSISTENT");
      }

      await tx.application.update({
        where: { id },
        data: {
          status: nextStatus,
          seatStatus: releasing ? "RELEASED" : reserving ? "RESERVED" : application.seatStatus,
          confirmedAt: nextStatus === "CONFIRMED" ? new Date() : null,
        },
      });
    });
  } catch (error) {
    if (error instanceof Error && error.message === "BATCH_FULL") redirect("/admin/applications?error=batch-full");
    redirect("/admin/applications?error=update-failed");
  }

  redirect("/admin");
}

const courseInput = z.object({
  name: z.string().trim().min(2),
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/),
  description: z.string().trim().min(10),
  duration: z.string().trim().min(2),
});

export async function createCourse(formData: FormData) {
  await requireMutation();
  const parsed = courseInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;

  await db.course.create({ data: parsed.data });
  revalidatePath("/admin/courses");
}

export async function toggleCourse(formData: FormData) {
  await requireMutation();
  const id = z.string().min(1).parse(formData.get("id"));
  const course = await db.course.findUnique({ where: { id }, select: { active: true } });

  if (course) {
    await db.course.update({ where: { id }, data: { active: !course.active } });
  }

  revalidatePath("/admin/courses");
}

const batchInput = z.object({
  courseId: z.string().min(1),
  identifier: z.string().trim().min(2),
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2026).max(2100),
  daysOfWeek: z.string().trim().min(2),
  startTime: z.string().trim().min(2),
  endTime: z.string().trim().min(2),
  capacity: z.coerce.number().int().min(1).max(1000),
}).superRefine((value, ctx) => validateSchedule(value, ctx));

const batchStatusEnum = ["DRAFT", "OPEN", "CLOSED", "FULL", "ARCHIVED"] as const;
const batchEditFormSchema = z.object({
  id: z.string().min(1),
  courseId: z.string().min(1),
  identifier: z.string().trim().min(2),
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2025).max(2100),
  daysOfWeek: z.string().trim().min(1),
  startTime: z.string().trim().min(1),
  endTime: z.string().trim().min(1),
  capacity: z.coerce.number().int().min(1).max(1000),
  status: z.enum(batchStatusEnum),
}).superRefine((value, ctx) => {
  const dayList = value.daysOfWeek.split(",").map((day) => day.trim()).filter(Boolean);
  if (dayList.length === 0) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["daysOfWeek"], message: "Select at least one day." });
  }

  const startMinutes = parseTimeToMinutes(value.startTime);
  const endMinutes = parseTimeToMinutes(value.endTime);
  if (Number.isNaN(startMinutes) || Number.isNaN(endMinutes)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["startTime"], message: "Provide a valid start and end time." });
    return;
  }

  if (endMinutes <= startMinutes) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["endTime"], message: "End time must be later than the start time." });
  }
});

function validateSchedule(value: { daysOfWeek: string; startTime: string; endTime: string }, ctx: z.RefinementCtx) {
  if (value.daysOfWeek.split(",").map((day) => day.trim()).filter(Boolean).length === 0) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["daysOfWeek"], message: "Select at least one day." });
  }
  const startMinutes = parseTimeToMinutes(value.startTime);
  const endMinutes = parseTimeToMinutes(value.endTime);
  if (Number.isNaN(startMinutes) || Number.isNaN(endMinutes)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["startTime"], message: "Provide a valid start and end time." });
  } else if (endMinutes <= startMinutes) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["endTime"], message: "End time must be later than the start time." });
  }
}

function parseTimeToMinutes(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;

  const time24 = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (time24) {
    const [hoursRaw, minutesRaw] = trimmed.split(":").map(Number);
    const hours = Number(hoursRaw);
    const minutes = Number(minutesRaw);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return Number.NaN;
    return hours * 60 + minutes;
  }

  const amPm = trimmed.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
  if (!amPm) return Number.NaN;

  const [, hoursRaw, minutesRaw, periodRaw] = amPm;
  const hours = Number(hoursRaw);
  const minutes = Number(minutesRaw);
  const period = periodRaw.toUpperCase();
  const hour24 = period === "PM" ? (hours === 12 ? 12 : hours + 12) : (hours === 12 ? 0 : hours);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes) || hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return Number.NaN;
  return hour24 * 60 + minutes;
}

function normalizeTimeValue(value: string) {
  const trimmed = value.trim();
  if (!trimmed) throw new Error("INVALID_TIME");

  const match = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (match) {
    const [hoursRaw, minutesRaw] = trimmed.split(":").map(Number);
    const hours = Number(hoursRaw);
    const minutes = Number(minutesRaw);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      throw new Error("INVALID_TIME");
    }

    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    const period = hours >= 12 ? "PM" : "AM";
    return `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`;
  }

  const amPmMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
  if (amPmMatch) {
    const [, hoursRaw, minutesRaw, periodRaw] = amPmMatch;
    const hours = Number(hoursRaw);
    const minutes = Number(minutesRaw);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes) || hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
      throw new Error("INVALID_TIME");
    }

    return `${hours}:${minutes.toString().padStart(2, "0")} ${periodRaw.toUpperCase()}`;
  }

  throw new Error("INVALID_TIME");
}

function normalizeDayList(value: string) {
  const days = value
    .split(",")
    .map((day) => day.trim())
    .filter(Boolean);

  if (days.length === 0) throw new Error("DAYS_REQUIRED");
  return days.join(", ");
}

export async function createBatch(formData: FormData) {
  await requireMutation();
  const parsed = batchInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;

  const data = parsed.data;
  await db.batch.create({
    data: {
      ...data,
      daysOfWeek: normalizeDayList(data.daysOfWeek),
      startTime: normalizeTimeValue(data.startTime),
      endTime: normalizeTimeValue(data.endTime),
    },
  });
  revalidatePath("/admin/batches");
  revalidatePath("/training");
}

export async function updateBatch(formData: FormData) {
  await requireMutation();
  const parsed = batchEditFormSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;

  const { id, courseId, identifier, month, year, daysOfWeek, startTime, endTime, capacity, status } = parsed.data;
  const normalizedDays = normalizeDayList(daysOfWeek);
  const normalizedStart = normalizeTimeValue(startTime);
  const normalizedEnd = normalizeTimeValue(endTime);

  const current = await db.batch.findUnique({ where: { id } });
  if (!current) return;

  if (capacity < current.reservedSeats) return;

  const nextStatus = status === "OPEN" && current.reservedSeats >= capacity ? "FULL" : status;

  await db.batch.update({
    where: { id },
    data: {
      courseId,
      identifier,
      month,
      year,
      daysOfWeek: normalizedDays,
      startTime: normalizedStart,
      endTime: normalizedEnd,
      capacity,
      status: nextStatus,
    },
  });

  revalidatePath("/admin/batches");
  revalidatePath("/training");
}

export async function updateBatchStatus(formData: FormData) {
  await requireMutation();
  const id = z.string().min(1).parse(formData.get("id"));
  const status = z.enum(batchStatusEnum).parse(formData.get("status"));
  const batch = await db.batch.findUnique({ where: { id } });
  if (!batch) return;

  await db.batch.update({
    where: { id },
    data: {
      status: status === "OPEN" && batch.reservedSeats >= batch.capacity ? "FULL" : status,
    },
  });

  revalidatePath("/admin/batches");
  revalidatePath("/training");
}

const announcementInput = z.object({ title: z.string().trim().min(2), slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/), content: z.string().trim().min(10) });

export async function createAnnouncement(formData: FormData) {
  await requireMutation();
  const parsed = announcementInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;

  await db.announcement.create({ data: parsed.data });
  revalidatePath("/admin/announcements");
}

export async function toggleAnnouncement(formData: FormData) {
  await requireMutation();
  const id = z.string().min(1).parse(formData.get("id"));
  const item = await db.announcement.findUnique({ where: { id }, select: { published: true } });

  if (item) {
    await db.announcement.update({
      where: { id },
      data: { published: !item.published, publishedAt: !item.published ? new Date() : null },
    });
  }

  revalidatePath("/admin/announcements");
  revalidatePath("/announcements");
}

async function requireMutation() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
}
