import { db } from "@/lib/db";
import { AdmissionForm } from "./admission-form";
import { getAvailableSeats, isPublicBatchEligible } from "@/lib/batch-eligibility";

export const dynamic = "force-dynamic";

export default async function AdmissionPage({ searchParams }: { searchParams: Promise<{ batch?: string }> }) {
  const params = await searchParams;
  const batches = await db.batch.findMany({ where: { status: "OPEN", course: { active: true } }, include: { course: true }, orderBy: [{ year: "asc" }, { month: "asc" }, { startTime: "asc" }] });
  const options = batches.filter(isPublicBatchEligible).map((batch) => ({ id: batch.id, course: batch.course.name, label: `${batch.startTime} – ${batch.endTime} · ${batch.daysOfWeek.replaceAll(", ", " · ")}`, available: getAvailableSeats(batch) }));
  return <main><section className="page-intro shell"><p className="eyebrow">Admission</p><h1>Reserve your place<br /><em>in the next batch.</em></h1><p>Tell us a little about yourself and choose a training slot. Every application is reviewed before confirmation.</p></section><section className="shell admission-layout"><div className="admission-aside"><p className="eyebrow">How it works</p><ol><li><strong>Choose a slot</strong><span>Find a time that fits your routine.</span></li><li><strong>Send your application</strong><span>We keep your information private.</span></li><li><strong>Hear from us</strong><span>Our team will confirm the next step.</span></li></ol></div><AdmissionForm batches={options} selectedBatchId={options.some((option) => option.id === params.batch) ? params.batch : undefined} /></section></main>;
}
