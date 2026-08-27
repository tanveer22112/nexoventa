import Image from "next/image";

export function OfficialLogo({ variant = "nav", className = "" }: { variant?: "nav" | "footer" | "admin" | "hero"; className?: string }) {
  const sizes = {
    nav: { width: 300, height: 120 },
    footer: { width: 280, height: 120 },
    admin: { width: 210, height: 100 },
    hero: { width: 700, height: 220 },
  }[variant];

  return (
    <span className={`official-logo official-logo-${variant} ${className}`}>
      <Image
        src="/images/branding/nexoventa-logo.png"
        alt="Nexoventa Medical Billing & RCM"
        width={sizes.width}
        height={sizes.height}
        priority={variant === "nav" || variant === "hero"}
        className="official-logo-image"
      />
    </span>
  );
}
