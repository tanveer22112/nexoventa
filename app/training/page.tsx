import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, Users } from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function monthLabel(month: number, year: number) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
}

export default async function TrainingPage() {
  const batches = await db.batch.findMany({
    where: { status: { in: ["OPEN", "FULL"] } },
    include: { course: true },
    orderBy: [{ year: "asc" }, { month: "asc" }, { startTime: "asc" }],
  });

  return (
    <main>
      <section className="page-intro shell"><p className="eyebrow">Training & mentorship</p><h1>Build a practical career in medical billing.</h1><p>Structured, slot-based training for people ready to understand the revenue cycle from the ground up.</p></section>
      <section className="shell training-list" aria-labelledby="available-batches">
        <div className="section-heading"><div><p className="eyebrow">Upcoming batches</p><h2 id="available-batches">Choose your rhythm.</h2></div><span className="capacity-note"><Users size={16} /> Capacity shown per slot</span></div>
        {batches.length === 0 ? <div className="empty-state">No open batches are available right now. Check back soon or contact us for the next intake.</div> : <div className="batch-grid">{batches.map((batch) => { const remaining = Math.max(batch.capacity - batch.reservedSeats, 0); const full = batch.status === "FULL" || remaining === 0; return <article className="batch-card" key={batch.id}><div className="batch-card-top"><span className="batch-code">{batch.identifier}</span><span className={full ? "status status-full" : "status"}>{full ? "Full" : "Open"}</span></div><h3>{batch.course.name}</h3><p className="batch-month"><CalendarDays size={17} /> {monthLabel(batch.month, batch.year)}</p><div className="batch-detail"><span><Clock3 size={16} /> {batch.startTime} – {batch.endTime}</span><span>{batch.daysOfWeek.replaceAll(", ", " · ")}</span></div><div className="seat-line"><strong>{full ? "0" : remaining} seats available</strong><span>{batch.reservedSeats} / {batch.capacity} reserved</span></div>{full ? <span className="full-label">Registration closed</span> : <Link className="text-link" href={`/admission?batch=${batch.id}`}>Apply now <ArrowUpRight size={16} /></Link>}</article>; })}</div>}
      </section>
    </main>
  );
}
