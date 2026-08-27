import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const cookieName = "nexoventa_admin";
const secret = process.env.AUTH_SECRET;

function sign(value: string) {
  if (!secret && process.env.NODE_ENV === "production") throw new Error("AUTH_SECRET is required in production.");
  return createHmac("sha256", secret || "development-only-secret").update(value).digest("hex");
}
export async function createAdminSession(userId: string) {
  const value = `${userId}.${Date.now()}`;
  (await cookies()).set(cookieName, `${value}.${sign(value)}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
}
export async function clearAdminSession() { (await cookies()).delete(cookieName); }
export async function getAdmin() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  const parts = token.split("."); const value = parts.slice(0, 2).join(".");
  const providedSignature = Buffer.from(parts[2] || "");
  const expectedSignature = Buffer.from(sign(value));
  if (parts.length !== 3 || providedSignature.length !== expectedSignature.length || !timingSafeEqual(providedSignature, expectedSignature)) return null;
  const issued = Number(parts[1]); if (!Number.isFinite(issued) || Date.now() - issued > 1000 * 60 * 60 * 8) return null;
  return db.user.findUnique({ where: { id: parts[0], role: "ADMIN" }, select: { id: true, name: true, email: true, role: true } });
}
export async function requireAdmin() { const admin = await getAdmin(); if (!admin) redirect("/admin/login"); return admin; }
