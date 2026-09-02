import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  CreditCard,
  FileCheck2,
  HeartPulse,
  Layers3,
  ShieldCheck,
  Users,
} from "lucide-react";

const capabilities = [
  "Complete Medical Billing",
  "End-to-End Revenue Cycle Management",
  "Eligibility & Benefits Verification",
  "Prior Authorization",
  "Charge Entry",
  "Claims Submission & Management",
  "Payment Posting",
  "Denial Management & Appeals",
  "Accounts Receivable (A/R) Follow-Up",
  "Insurance & Patient A/R Recovery",
  "Credentialing",
  "Provider Enrollment",
  "Payer Enrollment",
  "Medical Billing Audits",
  "Revenue Cycle Optimization",
  "Billing & Workflow Support",
];

const reasons = [
  {
    icon: Users,
    title: "40+ Experienced Professionals",
    text: "A dedicated team with 6+ years of experience across multiple areas of medical billing and RCM.",
  },
  {
    icon: Layers3,
    title: "End-to-End RCM Expertise",
    text: "Comprehensive support across the entire revenue cycle—from eligibility and claims to denials, A/R, credentialing, and enrollment.",
  },
  {
    icon: HeartPulse,
    title: "Multi-Specialty Capability",
    text: "Experience supporting different specialties, practice structures, and healthcare organizations.",
  },
  {
    icon: Code2,
    title: "Technology Adaptability",
    text: "Our team works across a broad range of healthcare and billing platforms and adapts to your existing systems.",
  },
  {
    icon: ShieldCheck,
    title: "U.S.-Focused Expertise",
    text: "Our processes and operations are designed around the requirements and complexities of the U.S. healthcare revenue cycle.",
  },
  {
    icon: FileCheck2,
    title: "One Reliable Partner",
    text: "Instead of coordinating multiple vendors for different revenue cycle functions, you can rely on one experienced team for comprehensive support.",
  },
];

const challenges = [
  "Increasing claim denials",
  "Aging accounts receivable",
  "Slow or inconsistent payments",
  "Credentialing or enrollment delays",
  "Eligibility and authorization challenges",
  "Billing workflow inefficiencies",
  "Payer-related issues",
  "Revenue cycle gaps",
];

const stats = [
  {
    value: "40+",
    label: "Experienced professionals",
  },
  {
    value: "6+",
    label: "Years of team experience",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-[var(--navy)]">
      {/* Hero */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto w-full max-w-[1160px] px-5 pb-14 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--teal)]">
                About Nexoventa
              </p>

              <h1 className="max-w-3xl text-[clamp(3rem,7vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.055em]">
                Practical expertise,
                <br />
                <em className="font-normal">shared clearly.</em>
              </h1>
            </div>

            <div className="lg:justify-self-end">
              <p className="max-w-xl text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
                At <strong className="text-[var(--navy)]">Nexoventa</strong>, we
                understand that running a successful healthcare practice
                requires more than providing excellent patient care. Your
                revenue cycle must also work efficiently, accurately, and
                consistently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="mx-auto grid w-full max-w-[1160px] grid-cols-1 gap-4 px-5 py-6 sm:grid-cols-2 sm:px-6 lg:px-8"
        aria-label="Nexoventa experience metrics"
      >
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[var(--line)] bg-[#e6f1edb3] px-6 py-7 shadow-[0_10px_28px_rgba(18,63,82,0.04)]"
          >
            <strong className="block text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-none tracking-[-0.06em] text-[var(--navy)]">
              {item.value}
            </strong>
            <span className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#54686d]">
              {item.label}
            </span>
          </div>
        ))}
      </section>

      {/* About */}
      <section className="mx-auto w-full max-w-[1160px] px-5 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--teal)]">
              More than billing
            </p>
            <h2 className="max-w-3xl text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.055em]">
              More Than Medical Billing. A Complete Revenue Cycle Partner for
              Your Practice.
            </h2>
          </div>

          <div className="max-w-3xl space-y-5 text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
            <p>
              We are a{" "}
              <strong className="text-[var(--navy)]">
                U.S.-focused Medical Billing and Revenue Cycle Management (RCM)
              </strong>{" "}
              company, serving healthcare providers and medical practices
              across the United States. Our team combines extensive industry
              knowledge, specialized expertise, and a deep understanding of the
              U.S. healthcare billing environment to help providers strengthen
              their financial operations and simplify the complexities of
              revenue cycle management.
            </p>

            <p>
              With a team of{" "}
              <strong className="text-[var(--navy)]">
                40+ experienced professionals, each with more than 6 years of
                industry experience
              </strong>
              , Nexoventa has the expertise and capacity to support practices
              of virtually any size—from independent physicians and small
              practices to growing clinics and larger healthcare organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto w-full max-w-[1160px] px-5 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="max-w-4xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--teal)]">
            End-to-end support
          </p>

          <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.055em]">
            Complete Medical Billing &amp; RCM Under One Roof
          </h2>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
            <p>
              Every practice is different. Your specialty, patient volume,
              payer mix, workflow, and operational challenges all require a
              different approach.
            </p>

            <p>
              That&apos;s why Nexoventa provides{" "}
              <strong className="text-[var(--navy)]">
                comprehensive, end-to-end revenue cycle solutions
              </strong>{" "}
              designed around the specific needs of your practice.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, index) => (
            <article
              key={item}
              className="border-b border-[var(--line)] px-0 py-5 sm:px-5 lg:px-4"
            >
              <div className="flex items-start gap-3">
                <span className="pt-1 text-[10px] font-bold tracking-[0.15em] text-[var(--teal)]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-sm font-semibold leading-6 text-[var(--navy)]">
                  {item}
                </h3>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-7 max-w-3xl text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
          From the front end of the revenue cycle to final payment and A/R
          recovery, our team is equipped to manage the processes that keep
          your practice financially healthy.
        </p>
      </section>

      {/* Specialties */}
      <section className="mx-auto w-full max-w-[1160px] px-5 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--teal)]">
              Specialty expertise
            </p>

            <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.055em]">
              Expertise Across Specialties
            </h2>
          </div>

          <div className="max-w-3xl space-y-5 text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
            <p>
              Whether you operate a small private practice, a multi-provider
              clinic, or a larger healthcare organization, our experienced
              professionals are equipped to work with a{" "}
              <strong className="text-[var(--navy)]">
                wide range of medical specialties and practice models
              </strong>
              .
            </p>

            <p>
              Our team understands that different specialties have different
              billing requirements, payer challenges, documentation standards,
              authorization processes, and reimbursement patterns. Rather than
              applying the same approach to every provider, we work to
              understand{" "}
              <strong className="text-[var(--navy)]">
                your practice, your specialty, your workflow, and your revenue
                cycle goals
              </strong>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="mx-auto w-full max-w-[1160px] px-5 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid overflow-hidden rounded-3xl border border-[var(--line)] bg-[#f3f7f4] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--teal)]">
              Technology-ready
            </p>

            <h2 className="max-w-2xl text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.055em]">
              Experienced With the Technology You Already Use
            </h2>

            <div className="mt-6 max-w-2xl space-y-5 text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
              <p>
                Your practice shouldn&apos;t have to change its entire
                technology infrastructure just to work with an RCM company.
              </p>

              <p>
                At Nexoventa, our professionals have experience working with a{" "}
                <strong className="text-[var(--navy)]">
                  wide range of EHR, EMR, practice management, clearinghouse,
                  and medical billing platforms
                </strong>
                . Our technology adaptability allows us to integrate into your
                existing workflow and work efficiently within the systems your
                practice already relies on.
              </p>

              <p>
                We focus on making the transition and day-to-day collaboration
                as seamless as possible.
              </p>
            </div>
          </div>

          <div className="flex items-center border-t border-[var(--line)] bg-[var(--navy)] p-7 text-white sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#78d7cf]">
                The Nexoventa approach
              </p>

              <p className="max-w-md text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl">
                Your software.
                <br />
                Your workflow.
                <br />
                <span className="text-[#78d7cf]">Our expertise.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto w-full max-w-[1160px] px-5 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--teal)]">
              Our team
            </p>

            <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.055em]">
              A Team Built on Experience
            </h2>
          </div>

          <div className="max-w-3xl">
            <div className="space-y-5 text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
              <p>
                Behind Nexoventa is a team of{" "}
                <strong className="text-[var(--navy)]">
                  40+ experienced professionals
                </strong>{" "}
                specializing in different areas of the healthcare revenue
                cycle.
              </p>

              <p>
                With{" "}
                <strong className="text-[var(--navy)]">
                  6+ years of experience across our team members
                </strong>
                , our collective expertise extends across:
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Medical Billing",
                "RCM",
                "Claims Management",
                "Denial Management",
                "A/R Recovery",
                "Credentialing",
                "Provider Enrollment",
                "Insurance Enrollment",
                "Payment Posting",
                "Eligibility",
                "Prior Authorization",
                "Billing Audits",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--line)] px-3 py-2 text-xs font-medium text-[var(--navy)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-8 text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
              This depth of experience allows us to build specialized teams
              around the needs of each client while maintaining consistent
              processes, accountability, and quality.
            </p>
          </div>
        </div>
      </section>

      {/* Revenue impact */}
      <section className="mx-auto w-full max-w-[1160px] px-5 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--teal)]">
              Revenue impact
            </p>

            <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.055em]">
              Built for Your Practice. Focused on Your Revenue.
            </h2>
          </div>

          <div>
            <div className="space-y-5 text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
              <p>We believe your billing partner should do more than submit claims.</p>

              <p>
                At Nexoventa, we work alongside your practice to identify
                revenue leakage, address billing challenges, reduce preventable
                denials, improve A/R performance, and create more efficient
                revenue cycle processes.
              </p>

              <p>Whether your practice is dealing with:</p>
            </div>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {challenges.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-[var(--line)] px-4 py-4 text-sm leading-6 text-[var(--navy)]"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--teal)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-base font-semibold leading-7 text-[var(--navy)] sm:text-[17px]">
              Our team is prepared to help.
            </p>
          </div>
        </div>
      </section>

      {/* Why choose Nexoventa */}
      <section className="mx-auto w-full max-w-[1160px] px-5 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="max-w-4xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--teal)]">
            Why choose us
          </p>

          <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.055em]">
            Why Healthcare Providers Choose Nexoventa
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {reasons.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-[var(--line)] bg-white p-6 transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(18,63,82,0.06)] sm:p-7"
              >
                <Icon
                  className="h-5 w-5 text-[var(--teal)]"
                  aria-hidden="true"
                />

                <h3 className="mt-5 text-xl font-medium tracking-[-0.025em] text-[var(--navy)] sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-base leading-7 text-[#5d6d70]">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-[1160px] px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="overflow-hidden rounded-3xl bg-[#e7efe9]">
          <div className="flex flex-col gap-8 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--teal)]">
                Let&apos;s work together
              </p>

              <h2 className="max-w-2xl text-[clamp(2.2rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.05em]">
                Let Nexoventa Strengthen Your Revenue Cycle
              </h2>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--navy)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#123f52]"
            >
              Partner with Nexoventa
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base leading-7 text-[#5d6d70] sm:text-[17px] sm:leading-8">
          <p>
            Your responsibility is to take care of your patients.{" "}
            <strong className="text-[var(--navy)]">
              Our responsibility is to help take care of your revenue cycle.
            </strong>
          </p>

          <p>
            At <strong className="text-[var(--navy)]">Nexoventa</strong>, we
            combine experienced professionals, proven processes, technology
            expertise, and dedicated client support to help healthcare
            providers operate more efficiently and build a stronger, more
            predictable revenue cycle.
          </p>

          <p>
            <strong className="text-[var(--navy)]">
              Your Practice. Your Revenue. Our Expertise.
            </strong>
          </p>

          <p>
            <strong className="text-[var(--navy)]">
              Partner with Nexoventa and let your team focus on patient care
              while we focus on the business behind it.
            </strong>
          </p>
        </div>
      </section>
    </main>
  );
}