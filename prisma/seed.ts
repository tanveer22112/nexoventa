import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const course = await prisma.course.upsert({
    where: { slug: "medical-billing" },
    update: {},
    create: {
      name: "Medical Billing",
      slug: "medical-billing",
      description: "Practical medical billing training with structured mentorship.",
      duration: "8 weeks",
    },
  });

  const batches = [
    ["SLOT-0304", "3:00 PM", "4:00 PM", "Monday, Wednesday, Friday"],
    ["SLOT-0405", "4:00 PM", "5:00 PM", "Monday, Wednesday, Friday"],
    ["SLOT-0506", "5:00 PM", "6:00 PM", "Tuesday, Thursday, Saturday"],
    ["SLOT-0607", "6:00 PM", "7:00 PM", "Tuesday, Thursday, Saturday"],
  ] as const;

  for (const [identifier, startTime, endTime, daysOfWeek] of batches) {
    await prisma.batch.upsert({
      where: { identifier },
      update: { courseId: course.id, status: "OPEN", capacity: 15 },
      create: {
        courseId: course.id,
        identifier,
        month: 9,
        year: 2026,
        daysOfWeek,
        startTime,
        endTime,
        capacity: 15,
        status: "OPEN",
      },
    });
  }

  await prisma.announcement.upsert({
    where: { slug: "september-2026-medical-billing-intake" },
    update: { title: "September 2026 Medical Billing intake", content: "Applications are open for the September 2026 Medical Billing training slots.", published: true, publishedAt: new Date("2026-08-01T00:00:00.000Z") },
    create: { title: "September 2026 Medical Billing intake", slug: "september-2026-medical-billing-intake", content: "Applications are open for the September 2026 Medical Billing training slots.", published: true, publishedAt: new Date("2026-08-01T00:00:00.000Z") },
  });

  console.log("Seeded Medical Billing and September 2026 batches.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
