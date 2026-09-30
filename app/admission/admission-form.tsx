"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitAdmission } from "./actions";
import { whatsappUrl } from "@/lib/whatsapp";

type BatchOption = { id: string; label: string; course: string; available: number };

export function AdmissionForm({ batches, selectedBatchId: initialBatchId }: { batches: BatchOption[]; selectedBatchId?: string }) {
  const [result, setResult] = useState<{ message: string; success?: boolean; name?: string; batchId?: string }>();
  const [pending, setPending] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState(initialBatchId || "");
  const [slotError, setSlotError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!batches.some((batch) => batch.id === formData.get("batchId"))) {
      setSlotError(true);
      setResult({ message: "Please select a training slot." });
      return;
    }
    setSlotError(false);
    setPending(true);
    setResult(undefined);
    const response = await submitAdmission(formData);
    setPending(false);
    if (response.ok) setResult({ success: true, message: "Application received", name: response.name, batchId: response.batchId });
    else {
      setSlotError(Boolean(response.fieldErrors?.batchId?.length));
      setResult({ message: response.message });
    }
  }

  if (result?.success) return <div className="success-panel"><CheckCircle2 size={42} /><p className="eyebrow">Application received</p><h2>Thank you, {result.name}.</h2><p>Your application is pending confirmation. We will be in touch with the next steps.</p><div className="form-actions"><Link className="text-link" href={`/training`}>Back to training <ArrowRight size={16} /></Link><a className="text-link" href={whatsappUrl(`Hello Nexoventa, I submitted a medical billing training application under the name ${result.name}.`)}>Continue on WhatsApp <ArrowRight size={16} /></a></div></div>;

  return <form className="admission-form" onSubmit={handleSubmit} noValidate>
    {result && <div className="form-alert" role="alert">{result.message}</div>}
    <div className="form-section"><p className="eyebrow">Your details</p><div className="form-grid"><Field label="Full name" name="fullName" required /><Field label="Father / guardian name" name="fatherName" required /><Field label="Phone number" name="phone" type="tel" required /><Field label="WhatsApp number" name="whatsapp" type="tel" required /><Field label="Email address" name="email" type="email" required /><Field label="Education" name="education" required /></div></div>
    <div className="form-section"><fieldset className={`training-slot-group${slotError ? " has-error" : ""}`} aria-describedby={slotError ? "training-slot-error" : undefined}><legend>Select Your Preferred Training Slot</legend><div className="training-slot-options">{batches.map((batch, index) => <label className={`training-slot-option${selectedBatchId === batch.id ? " is-selected" : ""}`} key={batch.id}><input type="radio" name="batchId" value={batch.id} checked={selectedBatchId === batch.id} required onChange={() => { setSelectedBatchId(batch.id); setSlotError(false); }} /><span><strong>Slot {index + 1} · {batch.course}</strong><small>{batch.label}</small><small>{batch.available} seats available</small></span></label>)}</div>{slotError && <p className="training-slot-error" id="training-slot-error" role="alert">Please select a training slot.</p>}</fieldset></div>
    <div className="form-section"><p className="eyebrow">A little more (optional)</p><div className="form-grid"><Field label="CNIC" name="cnic" /><Field label="Current occupation" name="occupation" /><Field label="Medical billing experience" name="experience" /><Field label="Address" name="address" /><label className="field field-wide"><span>Additional message</span><textarea name="notes" rows={4} /></label></div></div>
    <button className="submit-button" type="submit" disabled={pending}>{pending ? "Submitting..." : "Submit application"} <ArrowRight size={17} /></button>
  </form>;
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) { return <label className="field"><span>{label}{required ? " *" : ""}</span><input name={name} type={type} required={required} /></label>; }
