import Link from "next/link";
import {
  ArrowRight,
  BriefcaseMedical,
  Check,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  HeartPulse,
  Layers3,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  { value: "40+", label: "Experienced professionals" },
  { value: "5–6", label: "Years in medical billing & RCM" },
  { value: "6+", label: "Years of team experience" },
  { value: "US", label: "Healthcare revenue cycle focus" },
] as const;

const capabilities = [
  {
    number: "01",
    icon: BriefcaseMedical,
    title: "Medical Billing",
    description:
      "Clean claims, accurate coding support, and payer-ready submissions that reduce administrative friction.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Revenue Cycle Management",
    description:
      "End-to-end oversight that strengthens billing performance across claims, payment flow, and follow-up.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Denial Management",
    description:
      "Focused review and resolution strategies to reduce repeated denials and protect revenue continuity.",
  },
  {
    number: "04",
    icon: FileCheck2,
    title: "Provider Credentialing",
    description:
      "Support for enrollment and credentialing processes so providers can move forward with less delay.",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Billing Audits",
    description:
      "Operational reviews that highlight gaps, improve accountability, and support more consistent revenue outcomes.",
  },
  {
    number: "06",
    icon: GraduationCap,
    title: "Training & Mentorship",
    description:
      "Practical guidance that helps learners build confidence and capability in medical billing workflows.",
  },
] as const;

const experiencePillars = [
  "Claims management",
  "A/R follow-up",
  "Credentialing",
  "Enrollment",
  "Payment posting",
  "Billing audits",
  "Denial resolution",
  "Workflow support",
] as const;

const reasons = [
  {
    icon: Users,
    title: "40+ Experienced Professionals",
    text: "A dedicated team with broad operational and revenue-cycle knowledge to support healthcare providers with confidence.",
  },
  {
    icon: Layers3,
    title: "End-to-End RCM Expertise",
    text: "Support across claims, reimbursement, denials, follow-up, and practice operations for a more stable revenue cycle.",
  },
  {
    icon: HeartPulse,
    title: "Multi-Specialty Capability",
    text: "Experience supporting different practice structures and healthcare environments with practical billing support.",
  },
  {
    icon: MapPin,
    title: "Technology Adaptability",
    text: "Our team works within existing healthcare workflows and systems rather than forcing unnecessary disruption.",
  },
  {
    icon: ShieldCheck,
    title: "U.S.-Focused Expertise",
    text: "Processes built around the realities of the U.S. healthcare revenue cycle and payer environment.",
  },
  {
    icon: BriefcaseMedical,
    title: "One Reliable Partner",
    text: "Instead of coordinating multiple vendors, you get a focused team ready to support the full billing picture.",
  },
] as const;

const approach = [
  {
    step: "01",
    title: "Understand",
    text: "We learn your practice, workflow, payer mix, and the challenges affecting your revenue cycle.",
  },
  {
    step: "02",
    title: "Manage",
    text: "We support billing operations with clear oversight across claims, payment flow, and follow-up activity.",
  },
  {
    step: "03",
    title: "Improve",
    text: "We identify gaps, address denials, and promote more consistent reimbursement performance over time.",
  },
  {
    step: "04",
    title: "Support",
    text: "We continue to help your practice stay organized, accountable, and prepared for long-term operational stability.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="bg-[var(--paper)] text-[var(--navy)]">
      <section className="border-b border-[var(--line)] bg-[linear-gradient(180deg,#f9fbfe_0%,#f2f8fc_100%)]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--healthcare-blue)]">
                About Nexoventa
              </p>

              <h1 className="max-w-[620px] text-[clamp(3rem,6vw,5.25rem)] font-medium leading-[0.95] tracking-[-0.06em] text-[var(--navy)]">
                Experienced RCM support,
                <span className="block text-[var(--healthcare-blue)]">
                  built around your practice.
                </span>
              </h1>

              <p className="mt-6 max-w-[560px] text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
                Nexoventa helps healthcare providers manage medical billing and revenue cycle operations with accuracy, clarity, and practical support from a team that understands the demands of U.S. healthcare.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--deep-navy)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--navy)]"
                >
                  Talk to Nexoventa
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--very-light-blue)]"
                >
                  Explore services
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#54686d]">
                <span className="rounded-full border border-[var(--border)] bg-white px-3 py-2">
                  Medical billing
                </span>
                <span className="rounded-full border border-[var(--border)] bg-white px-3 py-2">
                  RCM support
                </span>
                <span className="rounded-full border border-[var(--border)] bg-white px-3 py-2">
                  Healthcare providers
                </span>
              </div>
            </div>

            <div className="relative lg:justify-self-end">
              <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-[var(--soft-blue)] blur-3xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_50px_rgba(11,58,74,0.08)] sm:p-7">
                <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--healthcare-blue)]">
                      Revenue operations
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--navy)]">
                      Practice support overview
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--soft-blue)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--healthcare-blue)]">
                    US-focused
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--very-light-blue)] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#54686d]">
                      Team
                    </p>
                    <p className="mt-3 text-3xl font-medium tracking-[-0.06em] text-[var(--navy)]">
                      40+
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--very-light-blue)] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#54686d]">
                      Experience
                    </p>
                    <p className="mt-3 text-3xl font-medium tracking-[-0.06em] text-[var(--navy)]">
                      5–6
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--very-light-blue)] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#54686d]">
                      Focus
                    </p>
                    <p className="mt-3 text-3xl font-medium tracking-[-0.06em] text-[var(--navy)]">
                      RCM
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--soft-blue)] p-4">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-[#54686d]">
                    <span>Workflow</span>
                    <span>Practice ready</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {["Claims", "Follow-up", "Reimbursement"].map((item, index) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[var(--healthcare-blue)]">
                          {index + 1}
                        </span>
                        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/80">
                          <div
                            className="h-full rounded-full bg-[var(--healthcare-blue)]"
                            style={{ width: `${65 + index * 12}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-[var(--navy)]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[var(--border)] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(11,58,74,0.04)]"
            >
              <div className="text-[clamp(2.1rem,4vw,3rem)] font-medium leading-none tracking-[-0.06em] text-[var(--navy)]">
                {item.value}
              </div>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#54686d]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--healthcare-blue)]">
              Who we are
            </p>
            <h2 className="max-w-[540px] text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[var(--navy)]">
              More than medical billing. A complete revenue cycle partner.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
            <p>
              Nexoventa is a U.S.-focused medical billing and revenue cycle management company helping healthcare providers manage the business side of patient care with greater clarity and consistency.
            </p>
            <p>
              We support practices with the processes that keep claims moving, reimbursements on track, and administrative burden from slowing down patient care and provider operations.
            </p>
            <p>
              From billing workflows to denial handling, follow-up, and documentation support, our team is focused on helping practices operate with cleaner claims and a more stable revenue cycle.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 max-w-[760px]">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--healthcare-blue)]">
            Capabilities
          </p>
          <h2 className="text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[var(--navy)]">
            Complete RCM support, under one roof.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map(({ number, icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_8px_24px_rgba(11,58,74,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(11,58,74,0.06)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--healthcare-blue)]">
                  {number}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--soft-blue)] text-[var(--healthcare-blue)]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em] text-[var(--navy)]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#5d6d70]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:gap-14">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--healthcare-blue)]">
              Experience
            </p>
            <h2 className="max-w-[520px] text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[var(--navy)]">
              Experience across the revenue cycle.
            </h2>
          </div>

          <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_12px_30px_rgba(11,58,74,0.04)] sm:p-8">
            <p className="max-w-[620px] text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
              Whether a practice is focused on a small patient volume or a larger multi-provider workflow, Nexoventa brings practical experience and process discipline to the areas that influence reimbursement and operational stability.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {experiencePillars.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[var(--border)] bg-[var(--very-light-blue)] px-3 py-3 text-sm font-medium text-[var(--navy)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--deep-navy)] text-white">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1.06fr_0.94fr] lg:px-8 lg:py-20">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9ed4fb]">
              Technology
            </p>
            <h2 className="max-w-[620px] text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.06em] text-white">
              Technology that fits your workflow.
            </h2>
            <p className="mt-6 max-w-[560px] text-base leading-7 text-[#cfe5f1] sm:text-[17px] sm:leading-8">
              Nexoventa works within the systems and workflows healthcare providers already rely on, helping reduce disruption while improving visibility, accountability, and process consistency across the billing cycle.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-8">
            <div className="grid gap-4">
              {[
                ["Existing systems", "Support that works with the way your practice already operates."],
                ["Operational clarity", "Clearer process visibility across claims, follow-up, and reimbursement."],
                ["Revenue continuity", "Support designed to reduce avoidable friction and improve billing consistency."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-lg font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#cfe5f1]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--healthcare-blue)]">
              Our team
            </p>
            <h2 className="max-w-[520px] text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[var(--navy)]">
              Experienced people behind every claim.
            </h2>
          </div>

          <div className="rounded-[30px] border border-[var(--border)] bg-[var(--soft-blue)] p-6 shadow-[0_12px_30px_rgba(11,58,74,0.04)] sm:p-8">
            <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-center">
              <div className="rounded-[24px] border border-[var(--border)] bg-white p-6">
                <div className="text-[clamp(2.4rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.06em] text-[var(--navy)]">
                  40+
                </div>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#54686d]">
                  Professionals
                </p>
                <div className="mt-8 border-t border-[var(--line)] pt-5">
                  <div className="text-[clamp(2.1rem,3vw,2.7rem)] font-medium leading-none tracking-[-0.06em] text-[var(--navy)]">
                    6+
                  </div>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#54686d]">
                    Years experience
                  </p>
                </div>
              </div>

              <div>
                <p className="text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
                  Behind every billing workflow is a team with practical knowledge across claims, denials, eligibility, follow-up, and provider support.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Medical Billing",
                    "RCM",
                    "Claims Management",
                    "Denial Management",
                    "A/R Recovery",
                    "Credentialing",
                    "Enrollment",
                    "Payment Posting",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--border)] bg-white px-3 py-2 text-xs font-medium text-[var(--navy)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 max-w-[700px]">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--healthcare-blue)]">
            Our approach
          </p>
          <h2 className="text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[var(--navy)]">
            A more organized revenue cycle starts here.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {approach.map(({ step, title, text }) => (
            <article key={step} className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--healthcare-blue)]">{step}</p>
              <h3 className="mt-5 text-2xl font-medium tracking-[-0.04em] text-[var(--navy)]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#5d6d70]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 max-w-[760px]">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--healthcare-blue)]">
            Why Nexoventa
          </p>
          <h2 className="text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[var(--navy)]">
            Why healthcare providers choose Nexoventa
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_8px_24px_rgba(11,58,74,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(11,58,74,0.06)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--soft-blue)] text-[var(--healthcare-blue)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[var(--navy)]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#5d6d70]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-[30px] bg-[var(--soft-blue)] p-7 sm:p-9 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--healthcare-blue)]">
                Let&apos;s work together
              </p>
              <h2 className="max-w-[680px] text-[clamp(2.3rem,4vw,3.4rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[var(--navy)]">
                Let Nexoventa strengthen your revenue cycle.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--deep-navy)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--navy)]"
              >
                Talk to Nexoventa
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--navy)] transition-colors hover:bg-[var(--very-light-blue)]"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
