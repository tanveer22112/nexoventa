import Link from "next/link";
import { ArrowRight, BriefcaseMedical, ClipboardCheck, GraduationCap, MapPin, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { db } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button";

const services = [
  { title: "Medical Billing", text: "Clean claim preparation, coding support, and payer-ready submissions for healthcare providers." },
  { title: "Revenue Cycle Management", text: "End-to-end process oversight that reduces delays, gaps, and missed reimbursement opportunities." },
  { title: "Denial Management", text: "Focused review and follow-up to resolve denials quickly and protect revenue continuity." },
  { title: "Provider Credentialing", text: "Support for clinic and provider enrollment so billing can begin without administrative drag." },
  { title: "Billing Audits", text: "Workflow checks that highlight leakage and tighten accountability across the revenue cycle." },
  { title: "Training & Mentorship", text: "Practical, career-focused learning that helps learners move confidently into the field." },
] as const;

const whyItems = [
  { value: "5–6 Years", label: "Medical billing & RCM experience" },
  { value: "2+ Years", label: "Mentoring learners in practical billing workflows" },
  { value: "Year-Round", label: "Training available across four daily slots" },
  { value: "Gilgit-Baltistan", label: "Based in Karim Town, Gilgit-Baltistan" },
] as const;

function monthLabel(month: number, year: number) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
}

function formatDays(daysOfWeek: string) {
  return daysOfWeek
    .split(",")
    .map((day) => day.trim())
    .filter(Boolean)
    .join(" · ");
}

export default async function Home() {
  const [featuredBatch, ...trainingBatches] = await db.batch.findMany({
    where: { status: { in: ["OPEN", "FULL"] } },
    include: { course: true },
    orderBy: [{ year: "asc" }, { month: "asc" }, { startTime: "asc" }],
    take: 5,
  });

  const trainingCards = trainingBatches.length > 0 ? trainingBatches : [];
  const availableSeats = featuredBatch ? Math.max(featuredBatch.capacity - featuredBatch.reservedSeats, 0) : 0;
  const featuredOpen = featuredBatch ? featuredBatch.status === "OPEN" && availableSeats > 0 : false;

  return <main>
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy-block">
          <p className="eyebrow">MEDICAL BILLING & RCM SOLUTIONS· GILGIT-BALTISTAN</p>
          <h1>Clean claims.<br /><span className="hero-accent">Faster reimbursements.</span><br />Fewer denials.</h1>
          <p className="hero-copy">Nexoventa supports healthcare providers with reliable medical billing, revenue cycle guidance, and practical training that keeps claims moving, reimbursements on time, and denials under control.</p>
          <div className="hero-actions">
            <Link className={buttonVariants({ size: "lg" })} href="/training">Explore Training <ArrowRight size={17} /></Link>
            <Link className={buttonVariants({ size: "lg" })} href="/services">Our Services <ArrowRight size={17} /></Link>
          </div>
        </div>
        <div className="hero-aside">
          {featuredBatch ? (
            <div className="training-availability-card">
              <p className="eyebrow eyebrow-card">Training · {monthLabel(featuredBatch.month, featuredBatch.year)}</p>
              <h3>{featuredBatch.course.name}</h3>
              <div className="training-card-meta">
                <span><Users size={15} /> {formatDays(featuredBatch.daysOfWeek)}</span>
                <span><TrendingUp size={15} /> {featuredBatch.startTime} – {featuredBatch.endTime}</span>
              </div>
              <div className="training-card-seats">
                <strong>{availableSeats} / {featuredBatch.capacity} seats available</strong>
                <small>{featuredOpen ? `${featuredBatch.capacity - availableSeats} reserved` : "Registration closed"}</small>
              </div>
              <Link className="text-link" href="/training">View Training <ArrowRight size={15} /></Link>
            </div>
          ) : (
            <div className="training-availability-card placeholder-card">
              <p className="eyebrow eyebrow-card">Training</p>
              <h3>Medical Billing</h3>
              <p>Training schedules are updated as batches open. Check the latest intake and availability.</p>
              <Link className="text-link" href="/training">View Training <ArrowRight size={15} /></Link>
            </div>
          )}
        </div>
      </div>
    </section>

    <section className="proof-strip">
      <div className="shell proof-grid">
        <div><strong>5–6</strong><span>years in medical billing & RCM</span></div>
        <div><strong>2+</strong><span>years mentoring future billers</span></div>
        <div><strong>4</strong><span>daily training slots, year-round</span></div>
      </div>
    </section>

    <section className="section shell trust-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">What we do</p>
          <h2>Trusted support across the revenue cycle.</h2>
        </div>
        <p>From claim submission to reimbursement follow-up, we help practices and learners work with more clarity, accountability, and confidence.</p>
      </div>
      <div className="service-grid">
        {services.map(({ title, text }, index) => {
          const iconMap = [BriefcaseMedical, ShieldCheck, ClipboardCheck, MapPin, TrendingUp, GraduationCap];
          const Icon = iconMap[index % iconMap.length];
          return <article className="service-item" key={title}>
            <span className="service-index">0{index + 1}</span>
            <div className="service-copy">
              <div className="service-icon"><Icon size={18} /></div>
              <strong>{title}</strong>
            </div>
            <p>{text}</p>
          </article>;
        })}
      </div>
    </section>

    <section className="section shell why-section">
      <div>
        <p className="eyebrow">Why Nexoventa</p>
        <h2>Practical expertise. Clear guidance.</h2>
      </div>
      <div className="why-list">
        {whyItems.map(({ value, label }) => <div key={label}><span className="why-value">{value}</span><span className="why-label">{label}</span></div>)}
      </div>
    </section>

    <section className="training-preview">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Medical billing training</p>
            <h2>Learn Medical Billing. Build Your Career.</h2>
          </div>
          <Link className={buttonVariants({ size: "lg" })} href="/training">View Training <ArrowRight size={17} /></Link>
        </div>

        {trainingCards.length > 0 ? (
          <div className="training-preview-grid">
            {trainingCards.map((batch) => {
              const remaining = Math.max(batch.capacity - batch.reservedSeats, 0);
              const full = batch.status === "FULL" || remaining === 0;
              return <article className="preview-slot" key={batch.id}>
                <span className={full ? "status status-full" : "status"}>{full ? "Registration closed" : "Open"}</span>
                <strong>{batch.course.name}</strong>
                <span>{monthLabel(batch.month, batch.year)}</span>
                <span>{formatDays(batch.daysOfWeek)}</span>
                <span>{batch.startTime} – {batch.endTime}</span>
                <small>{batch.reservedSeats} / {batch.capacity} seats reserved · {remaining} remaining</small>
              </article>;
            })}
          </div>
        ) : (
          <div className="preview-empty">Training batches will appear here as upcoming slots are added to the system.</div>
        )}

        <div className="training-preview-callout">
          <div>
            <strong>Ready to start your medical billing career?</strong>
            <span>Apply for the next available intake and begin with focused, practical training.</span>
          </div>
          <Link className="text-link" href="/admission">Apply for Training <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>

    <section className="contact-band">
      <div className="shell contact-inner">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2>Let&apos;s make the next claim count.</h2>
        </div>
        <Link className={buttonVariants({ size: "lg" })} href="/contact">Talk to Nexoventa <ArrowRight size={17} /></Link>
      </div>
    </section>
  </main>;
}