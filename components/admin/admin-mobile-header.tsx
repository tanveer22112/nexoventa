"use client";

import { Menu } from "lucide-react";
import { OfficialLogo } from "@/components/branding/official-logo";

export function AdminMobileHeader({ onOpen }: { onOpen: () => void }) {
  return <header className="admin-mobile-header"><button type="button" onClick={onOpen} aria-label="Open admin navigation"><Menu size={21} /></button><OfficialLogo variant="nav" /></header>;
}
