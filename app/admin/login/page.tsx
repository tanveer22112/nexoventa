import { loginAdmin } from "../actions";
import { OfficialLogo } from "@/components/branding/official-logo";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <main className="admin-login"><div className="admin-login-panel"><OfficialLogo variant="admin" /><p className="eyebrow">Nexoventa admin</p><h1>Welcome back.</h1><p>Sign in to manage courses, batches, and applications.</p>{error && <div className="form-alert" role="alert">Email or password is incorrect.</div>}<form action={loginAdmin} className="admission-form"><label className="field"><span>Email</span><input name="email" type="email" autoComplete="email" required /></label><label className="field"><span>Password</span><input name="password" type="password" autoComplete="current-password" required /></label><button className="submit-button" type="submit">Sign in</button></form></div></main>;
}
