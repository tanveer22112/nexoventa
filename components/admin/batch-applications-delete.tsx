"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function BatchApplicationsDelete({ batchId, identifier, applicationCount }: { batchId: string; identifier: string; applicationCount: number }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [batchDeleted, setBatchDeleted] = useState(false);
  const [remainingApplications, setRemainingApplications] = useState(applicationCount);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    setRemainingApplications(applicationCount);
  }, [applicationCount]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (confirming && dialog && !dialog.open) dialog.showModal();
    if (!confirming && dialog?.open) dialog.close();
  }, [confirming]);

  async function deleteBatchApplications() {
    setDeleting(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/applications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchId }),
      });
      const result = await response.json().catch(() => null) as { message?: string; applicationsDeleted?: number; batchDeleted?: boolean } | null;
      if (!response.ok) throw new Error(result?.message || "Applications for this batch could not be deleted.");
      const deletedCount = result?.applicationsDeleted ?? remainingApplications;
      setRemainingApplications(Math.max(remainingApplications - deletedCount, 0));
      if (result?.batchDeleted) {
        setBatchDeleted(true);
        setFeedback(result.message || `Batch ${identifier} permanently deleted.`);
      } else {
        setFeedback(result?.message || `${deletedCount} applications deleted.`);
      }
      setConfirming(false);
      router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Applications for this batch could not be deleted.");
    } finally {
      setDeleting(false);
    }
  }

  if (batchDeleted) return <p className="batch-delete-feedback success" role="status">{feedback}</p>;

  return (
    <>
      {feedback && <p className="batch-delete-feedback" role="status">{feedback}</p>}
      <button className="batch-delete-button" type="button" aria-label={`Permanently delete Batch ${identifier}, ${remainingApplications} students`} onClick={() => { setError(null); setConfirming(true); }}>
        <Trash2 size={14} />
        <span>Delete Batch</span>
        <small>{remainingApplications} students</small>
      </button>
      <dialog className="delete-confirmation" ref={dialogRef} aria-labelledby={`delete-batch-title-${batchId}`} aria-describedby={`delete-batch-description-${batchId}`} onCancel={(event) => { event.preventDefault(); if (!deleting) setConfirming(false); }}>
        <p className="eyebrow">Permanent action</p>
        <h2 id={`delete-batch-title-${batchId}`}>Delete Batch Permanently?</h2>
        <p id={`delete-batch-description-${batchId}`}>This will permanently delete {identifier}, its {remainingApplications} applications, and student records that are no longer linked to an application. Other batches, the course, and students with applications in other batches will remain.</p>
        {error && <p className="delete-confirmation-error" role="alert">{error}</p>}
        <div className="delete-confirmation-actions">
          <button className="admin-action" type="button" disabled={deleting} onClick={() => setConfirming(false)}>Cancel</button>
          <button className="delete-permanently-button" type="button" disabled={deleting} onClick={deleteBatchApplications}>{deleting ? "Deleting..." : "Delete Batch Permanently"}</button>
        </div>
      </dialog>
    </>
  );
}