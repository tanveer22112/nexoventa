import Link from "next/link";
import type { ApplicationStatus } from "@/lib/generated/prisma/enums";
import { BatchApplicationsDelete } from "@/components/admin/batch-applications-delete";

export type TrainingSlotSummary = {
  id: string;
  identifier: string;
  month: number;
  year: number;
  startTime: string;
  endTime: string;
  courseName: string;
  applicationCount: number;
};

const statuses: Array<{ value: ApplicationStatus | ""; label: string }> = [
  { value: "", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "REJECTED", label: "Rejected" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "WAITLISTED", label: "Waitlisted" },
];

export function TrainingSlotFilters({
  slots,
  totalApplications,
  selectedSlotId,
  selectedStatus = "",
  statusCounts,
}: {
  slots: TrainingSlotSummary[];
  totalApplications: number;
  selectedSlotId?: string;
  selectedStatus?: ApplicationStatus | "";
  statusCounts?: Record<ApplicationStatus, number>;
}) {
  function filterHref(slotId?: string, status = selectedStatus) {
    const params = new URLSearchParams();
    if (slotId) params.set("slot", slotId);
    if (status) params.set("status", status);
    const query = params.toString();
    return `/admin/applications${query ? `?${query}` : ""}`;
  }

  return (
    <section className="admin-slot-section" aria-labelledby="training-slots-heading">
      <div className="admin-section-head">
        <div>
          <p className="eyebrow">Training slots</p>
          <h2 id="training-slots-heading">Applicants by slot</h2>
        </div>
      </div>
      <nav className="admin-slot-filters" aria-label="Filter applicants by training slot">
        <Link className={`admin-slot-filter${selectedSlotId ? "" : " is-active"}`} href={filterHref(undefined)} aria-current={selectedSlotId ? undefined : "page"}>
          <span>All Applicants</span>
          <strong>{totalApplications}</strong>
        </Link>
        {slots.map((slot) => (
          <div className="admin-slot-card" key={slot.id}>
            <Link className={`admin-slot-filter${selectedSlotId === slot.id ? " is-active" : ""}`} href={filterHref(slot.id)} aria-current={selectedSlotId === slot.id ? "page" : undefined}>
              <span>{slot.identifier} · {slot.courseName}</span>
              <strong>{slot.startTime} – {slot.endTime}</strong>
              <small>{slot.month}/{slot.year}</small>
              <b>{slot.applicationCount} applicants</b>
            </Link>
            <BatchApplicationsDelete batchId={slot.id} identifier={slot.identifier} applicationCount={slot.applicationCount} />
          </div>
        ))}
      </nav>
      {statusCounts && (
        <nav className="admin-status-filters" aria-label="Filter applicants by status">
          {statuses.map(({ value, label }) => (
            <Link className={`admin-status-filter${selectedStatus === value ? " is-active" : ""}`} href={filterHref(selectedSlotId, value)} aria-current={selectedStatus === value ? "page" : undefined} key={value || "all"}>
              {label}<span>{value ? statusCounts[value] : Object.values(statusCounts).reduce((total, count) => total + count, 0)}</span>
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}