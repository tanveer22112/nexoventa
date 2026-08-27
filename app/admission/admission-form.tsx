"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitAdmission } from "./actions";
import { whatsappUrl } from "@/lib/whatsapp";

type BatchOption = { id: string; label: string; course: string; available: number };

export function AdmissionForm({ batches, selectedBatchId }: { batches: BatchOption[]; selectedBatchId?: string }) {
  const [result, setResult] = useState<{ message: string; success?: boolean; name?: string; batchId?: string }>();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setResult(undefined);
    const response = await submitAdmission(new FormData(event.currentTarget));
    setPending(false);
    if (response.ok) setResult({ success: true, message: "Application received", name: response.name, batchId: response.batchId });
    else setResult({ message: response.message });
  }

  if (result?.success) return <div className="success-panel"><CheckCircle2 size={42} /><p className="eyebrow">Application received</p><h2>Thank you, {result.name}.</h2><p>Your application is pending confirmation. We will be in touch with the next steps.</p><div className="form-actions"><Link className="text-link" href={`/training`}>Back to training <ArrowRight size={16} /></Link><a className="text-link" href={whatsappUrl(`Hello Nexoventa, I submitted a medical billing training application under the name ${result.name}.`)}>Continue on WhatsApp <ArrowRight size={16} /></a></div></div>;

  return <form className="admission-form" onSubmit={handleSubmit} noValidate>
    {result && <div className="form-alert" role="alert">{result.message}</div>}
    <input type="hidden" name="batchId" value={selectedBatchId || ""} />
    <div className="form-section"><p className="eyebrow">Your details</p><div className="form-grid"><Field label="Full name" name="fullName" required /><Field label="Father / guardian name" name="fatherName" required /><Field label="Phone number" name="phone" type="tel" required /><Field label="WhatsApp number" name="whatsapp" type="tel" required /><Field label="Email address" name="email" type="email" required /><Field label="Education" name="education" required /></div></div>
    <div className="form-section"><p className="eyebrow">Your preferred slot</p><label className="field field-wide"><span>Training slot</span><select name="batchId" defaultValue={selectedBatchId || ""} required><option value="">Select an open slot</option>{batches.map((batch) => <option key={batch.id} value={batch.id}>{batch.course} · {batch.label} · {batch.available} seats left</option>)}</select></label></div>
    <div className="form-section"><p className="eyebrow">A little more (optional)</p><div className="form-grid"><Field label="CNIC" name="cnic" /><Field label="Current occupation" name="occupation" /><Field label="Medical billing experience" name="experience" /><Field label="Address" name="address" /><label className="field field-wide"><span>Additional message</span><textarea name="notes" rows={4} /></label></div></div>
    <button className="submit-button" type="submit" disabled={pending}>{pending ? "Submitting..." : "Submit application"} <ArrowRight size={17} /></button>
  </form>;
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) { return <label className="field"><span>{label}{required ? " *" : ""}</span><input name={name} type={type} required={required} /></label>; }
