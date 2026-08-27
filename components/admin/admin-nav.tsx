"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, CalendarDays, FileText, Megaphone, Settings, Users, X } from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";
import { OfficialLogo } from "@/components/branding/official-logo";

const items = [
  ["Dashboard", "/admin", BarChart3],
  ["Courses", "/admin/courses", BookOpen],
  ["Batches", "/admin/batches", CalendarDays],
  ["Applications", "/admin/applications", FileText],
  ["Students", "/admin/students", Users],
  ["Announcements", "/admin/announcements", Megaphone],
  ["Settings", "/admin/settings", Settings],
] as const;

export function AdminNav({ name, open, onClose }: { name: string; open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  return <aside className={`admin-sidebar${open ? " is-open" : ""}`}>
    <div className="admin-brand"><OfficialLogo variant="admin" />{onClose && <button type="button" className="admin-close" aria-label="Close admin navigation" onClick={onClose}><X size={20} /></button>}</div>
    <div className="admin-user"><span className="admin-avatar">{name.charAt(0).toUpperCase()}</span><span><strong>{name}</strong><small>Administrator</small></span></div>
    <nav className="admin-links" aria-label="Admin navigation">{items.map(([label, href, Icon]) => { const active = href === "/admin" ? pathname === href : pathname.startsWith(href); return <Link className={active ? "is-active" : ""} href={href} key={href} onClick={onClose}><Icon size={17} /><span>{label}</span></Link>; })}</nav>
    <form action={logoutAdmin} className="admin-signout"><button type="submit">Sign out</button></form>
  </aside>;
}
