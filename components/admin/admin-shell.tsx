"use client";

import { useState } from "react";
import { AdminMobileHeader } from "@/components/admin/admin-mobile-header";
import { AdminNav } from "@/components/admin/admin-nav";

export function AdminShell({ children, name }: { children: React.ReactNode; name: string }) {
  const [open, setOpen] = useState(false);
  return <div className="admin-shell"><AdminNav name={name} open={open} onClose={() => setOpen(false)} /><div className="admin-content"><AdminMobileHeader onOpen={() => setOpen(true)} />{children}</div>{open && <button className="admin-overlay" type="button" aria-label="Close admin navigation" onClick={() => setOpen(false)} />}</div>;
}
