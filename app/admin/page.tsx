import { logoutAdmin, updateApplicationStatus } from "./actions";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const admin = await requireAdmin();
  const [applications, totalApplications, pending, confirmed, batches, fullBatches, batchTotals] = await Promise.all([
    db.application.findMany({ include: { student: true, batch: { include: { course: true } } }, orderBy: { appliedAt: "desc" }, take: 50 }),
    db.application.count(),
    db.application.count({ where: { status: "PENDING" } }),
    db.application.count({ where: { status: "CONFIRMED" } }),
    db.batch.count({ where: { status: { in: ["OPEN", "FULL"] } } }),
    db.batch.count({ where: { status: "FULL" } }),
    db.batch.findMany({ where: { status: { in: ["OPEN", "FULL"] } }, select: { capacity: true, reservedSeats: true } }),
  ]);
  const availableSeats = batchTotals.reduce((total, batch) => total + Math.max(batch.capacity - batch.reservedSeats, 0), 0);
  return <main className="admin-page"><div className="shell"><div className="admin-top"><div><p className="eyebrow">Admin dashboard</p><h1>Good day, {admin.name || admin.email}.</h1></div><form action={logoutAdmin}><button className="admin-logout" type="submit">Sign out</button></form></div><div className="admin-stats"><Stat label="Applications" value={totalApplications} /><Stat label="Pending" value={pending} /><Stat label="Confirmed" value={confirmed} /><Stat label="Active batches" value={batches} /><Stat label="Available seats" value={availableSeats} /><Stat label="Full batches" value={fullBatches} /></div><section className="admin-table-wrap"><div className="admin-section-head"><div><p className="eyebrow">Recent applications</p><h2>Review queue</h2></div><span>{applications.length} shown</span></div><div className="admin-table-scroll"><table><thead><tr><th>Student</th><th>Course / slot</th><th>Applied</th><th>Status</th><th>Update</th></tr></thead><tbody>{applications.map((application) => <tr key={application.id}><td><strong>{application.student.fullName}</strong><small>{application.student.phone}</small></td><td>{application.batch.course.name}<small>{application.batch.identifier} · {application.batch.startTime}</small></td><td>{application.appliedAt.toLocaleDateString("en-GB")}</td><td><span className="table-status">{application.status}</span></td><td><form action={updateApplicationStatus} className="status-form"><input type="hidden" name="id" value={application.id} /><select name="status" defaultValue={application.status} aria-label={`Update ${application.student.fullName} status`}><option>PENDING</option><option>CONFIRMED</option><option>REJECTED</option><option>CANCELLED</option><option>WAITLISTED</option></select><button type="submit">Save</button></form></td></tr>)}</tbody></table></div></section></div></main>;
}
function Stat({ label, value }: { label: string; value: number }) { return <div className="admin-stat"><span>{label}</span><strong>{value}</strong></div>; }
