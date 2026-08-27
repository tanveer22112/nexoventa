import { AdminShell } from "@/components/admin/admin-shell";
import { getAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdmin();
  return <AdminShell name={admin?.name || admin?.email || "Administrator"}>{children}</AdminShell>;
}
