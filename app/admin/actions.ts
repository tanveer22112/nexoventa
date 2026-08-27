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
export async function logoutAdmin() { await clearAdminSession(); redirect("/admin/login"); }
export async function updateApplicationStatus(formData: FormData) {
  await requireMutation();
  const parsed = z.object({ id: z.string().min(1), status: z.enum(["PENDING", "CONFIRMED", "REJECTED", "CANCELLED", "WAITLISTED"]) }).safeParse({ id: formData.get("id"), status: formData.get("status") });
  if (!parsed.success) return;
  const { id, status } = parsed.data;
  try { await db.$transaction(async (tx) => {
    const application = await tx.application.findUnique({ where: { id }, include: { batch: true } });
    if (!application) return;
    const nextStatus = status;
    const releasing = application.seatStatus === "RESERVED" && ["REJECTED", "CANCELLED"].includes(nextStatus);
    const reserving = application.seatStatus === "RELEASED" && ["PENDING", "CONFIRMED"].includes(nextStatus);
    if (reserving) {
      const updated = await tx.batch.updateMany({ where: { id: application.batchId, reservedSeats: { lt: application.batch.capacity } }, data: { reservedSeats: { increment: 1 }, status: "OPEN" } });
      if (updated.count !== 1) throw new Error("BATCH_FULL");
    }
    if (releasing) await tx.batch.updateMany({ where: { id: application.batchId, reservedSeats: { gt: 0 } }, data: { reservedSeats: { decrement: 1 }, status: "OPEN" } });
    if (nextStatus === "CONFIRMED" && application.seatStatus === "RESERVED" && application.batch.reservedSeats > application.batch.capacity) throw new Error("BATCH_INCONSISTENT");
    await tx.application.update({ where: { id }, data: { status: nextStatus, seatStatus: releasing ? "RELEASED" : reserving ? "RESERVED" : application.seatStatus, confirmedAt: nextStatus === "CONFIRMED" ? new Date() : null } });
  }); } catch (error) { if (error instanceof Error && error.message === "BATCH_FULL") redirect("/admin/applications?error=batch-full"); redirect("/admin/applications?error=update-failed"); }
  redirect("/admin");
}

const courseInput = z.object({ name: z.string().trim().min(2), slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/), description: z.string().trim().min(10), duration: z.string().trim().min(2) });
export async function createCourse(formData: FormData) { await requireMutation(); const parsed = courseInput.safeParse(Object.fromEntries(formData)); if (!parsed.success) return; await db.course.create({ data: parsed.data }); revalidatePath("/admin/courses"); }
export async function toggleCourse(formData: FormData) { await requireMutation(); const id = z.string().min(1).parse(formData.get("id")); const course = await db.course.findUnique({ where: { id }, select: { active: true } }); if (course) await db.course.update({ where: { id }, data: { active: !course.active } }); revalidatePath("/admin/courses"); }
const batchInput = z.object({ courseId: z.string().min(1), identifier: z.string().trim().min(2), month: z.coerce.number().int().min(1).max(12), year: z.coerce.number().int().min(2026).max(2100), daysOfWeek: z.string().trim().min(2), startTime: z.string().trim().min(2), endTime: z.string().trim().min(2), capacity: z.coerce.number().int().min(1).max(15) });
export async function createBatch(formData: FormData) { await requireMutation(); const parsed = batchInput.safeParse(Object.fromEntries(formData)); if (!parsed.success) return; await db.batch.create({ data: parsed.data }); revalidatePath("/admin/batches"); revalidatePath("/training"); }
export async function updateBatchStatus(formData: FormData) { await requireMutation(); const id = z.string().min(1).parse(formData.get("id")); const status = z.enum(["DRAFT", "OPEN", "CLOSED", "FULL", "ARCHIVED"]).parse(formData.get("status")); const batch = await db.batch.findUnique({ where: { id } }); if (!batch) return; await db.batch.update({ where: { id }, data: { status: status === "OPEN" && batch.reservedSeats >= batch.capacity ? "FULL" : status } }); revalidatePath("/admin/batches"); revalidatePath("/training"); }
const announcementInput = z.object({ title: z.string().trim().min(2), slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/), content: z.string().trim().min(10) });
export async function createAnnouncement(formData: FormData) { await requireMutation(); const parsed = announcementInput.safeParse(Object.fromEntries(formData)); if (!parsed.success) return; await db.announcement.create({ data: parsed.data }); revalidatePath("/admin/announcements"); }
export async function toggleAnnouncement(formData: FormData) { await requireMutation(); const id = z.string().min(1).parse(formData.get("id")); const item = await db.announcement.findUnique({ where: { id }, select: { published: true } }); if (item) await db.announcement.update({ where: { id }, data: { published: !item.published, publishedAt: !item.published ? new Date() : null } }); revalidatePath("/admin/announcements"); revalidatePath("/announcements"); }
async function requireMutation() { const admin = await getAdmin(); if (!admin) redirect("/admin/login"); }
