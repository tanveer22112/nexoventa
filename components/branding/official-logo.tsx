import Image from "next/image";

export function OfficialLogo({ variant = "nav", className = "" }: { variant?: "nav" | "footer" | "admin" | "hero"; className?: string }) {
  return (
    <span className={`official-logo official-logo-${variant} ${className}`}>
      <Image
        src="/logo.png"
        alt="Nexoventa RCM Solutions"
        width={866}
        height={288}
        priority={variant === "nav" || variant === "hero"}
        className="official-logo-image"
      />
    </span>
  );
}
