import { createBatch, updateBatch, updateBatchStatus } from "../actions";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function BatchesPage() {
  await requireAdmin();
  const [courses, batches] = await Promise.all([
    db.course.findMany({ orderBy: { name: "asc" } }),
    db.batch.findMany({ include: { course: true }, orderBy: [{ year: "desc" }, { month: "desc" }, { startTime: "asc" }] }),
  ]);

  return <main className="admin-page"><div className="shell">
    <div className="admin-top"><div><p className="eyebrow">Training operations</p><h1>Batches</h1></div></div>
    <form action={createBatch} className="admin-form">
      <BatchFields courses={courses} />
      <button className="admin-action primary" type="submit">Create batch</button>
    </form>
    <div className="admin-table-wrap"><div className="admin-section-head"><div><p className="eyebrow">Schedule</p><h2>All batches</h2></div></div>
      <div className="admin-table-scroll"><table><thead><tr><th>Batch</th><th>Schedule</th><th>Seats</th><th>Status</th><th>Actions</th></tr></thead><tbody>
        {batches.map((batch) => <tr key={batch.id}>
          <td><strong>{batch.course.name}</strong><small>{batch.identifier} · {batch.month}/{batch.year}</small></td>
          <td>{batch.daysOfWeek}<small>{batch.startTime} – {batch.endTime}</small></td>
          <td>{batch.reservedSeats} / {batch.capacity}<small>{Math.max(batch.capacity - batch.reservedSeats, 0)} available</small></td>
          <td>{batch.status}</td>
          <td>
            <details><summary className="admin-action">Edit</summary>
              <form action={updateBatch} className="admin-form admin-form-compact">
                <input type="hidden" name="id" value={batch.id} />
                <BatchFields courses={courses} batch={batch} />
                <button className="admin-action primary" type="submit">Save changes</button>
              </form>
            </details>
            <form action={updateBatchStatus} className="status-form"><input type="hidden" name="id" value={batch.id} /><select name="status" defaultValue={batch.status} aria-label={`Change ${batch.identifier} status`}><option>DRAFT</option><option>OPEN</option><option>CLOSED</option><option>FULL</option><option>ARCHIVED</option></select><button type="submit">Update status</button></form>
          </td>
        </tr>)}
      </tbody></table></div>
    </div>
  </div></main>;
}

function BatchFields({ courses, batch }: { courses: { id: string; name: string }[]; batch?: { courseId: string; identifier: string; month: number; year: number; daysOfWeek: string; startTime: string; endTime: string; capacity: number; status: string } }) {
  return <>
    <label className="field"><span>Course</span><select name="courseId" defaultValue={batch?.courseId} required><option value="">Select course</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}</select></label>
    <Field label="Identifier" name="identifier" value={batch?.identifier} />
    <Field label="Month" name="month" type="number" value={batch?.month} />
    <Field label="Year" name="year" type="number" value={batch?.year} />
    <Field label="Days" name="daysOfWeek" value={batch?.daysOfWeek} />
    <Field label="Start" name="startTime" value={batch?.startTime} />
    <Field label="End" name="endTime" value={batch?.endTime} />
    <Field label="Capacity" name="capacity" type="number" value={batch?.capacity} />
    {batch && <label className="field"><span>Status</span><select name="status" defaultValue={batch.status}><option>DRAFT</option><option>OPEN</option><option>CLOSED</option><option>FULL</option><option>ARCHIVED</option></select></label>}
  </>;
}

function Field({ label, name, type = "text", value }: { label: string; name: string; type?: string; value?: string | number }) {
  return <label className="field"><span>{label}</span><input name={name} type={type} defaultValue={value} required /></label>;
}
