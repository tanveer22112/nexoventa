import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PublicShell } from "@/components/layout/public-shell";
import { OrganizationSchema } from "@/components/marketing/organization-schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Nexoventa | Medical Billing & RCM",
    template: "%s | Nexoventa",
  },
  description: "Medical billing, revenue cycle management, and practical training from Gilgit-Baltistan.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nexoventa | Medical Billing & RCM",
    description: "Medical billing, revenue cycle management, and practical training from Gilgit-Baltistan.",
    url: "/",
    siteName: "Nexoventa Medical Billing & RCM",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><OrganizationSchema /><PublicShell>{children}</PublicShell></body>
    </html>
  );
}
