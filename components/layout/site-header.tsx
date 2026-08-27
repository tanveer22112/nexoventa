"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { OfficialLogo } from "@/components/branding/official-logo";

const links = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Training", "/training"],
  ["FAQ", "/faq"],
  ["Announcements", "/announcements"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Nexoventa home" onClick={() => setOpen(false)}>
          <OfficialLogo variant="nav" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className={`${buttonVariants()} header-cta`} href="/admission">Apply for training <ArrowUpRight size={16} /></Link>
        <button className="mobile-menu" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link className={`${buttonVariants()} mobile-nav-cta`} href="/admission" onClick={() => setOpen(false)}>Apply for training <ArrowUpRight size={16} /></Link></nav>}
    </header>
  );
}
