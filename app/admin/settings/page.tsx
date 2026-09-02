import { changeAdminPassword, updateAdminProfile } from "../actions";
import { requireAdmin } from "@/lib/auth";

export default async function SettingsPage() {
  const admin = await requireAdmin();

  return <main className="admin-page"><div className="shell"><div className="admin-top"><div><p className="eyebrow">Workspace</p><h1>Settings</h1></div></div>
    <section className="admin-table-wrap settings-panel">
      <div className="admin-section-head"><div><p className="eyebrow">Account</p><h2>Administrator profile</h2></div></div>
      <form action={updateAdminProfile} className="admin-form settings-content">
        <label className="field"><span>Name</span><input name="name" defaultValue={admin.name || ""} /></label>
        <label className="field"><span>Email</span><input name="email" type="email" defaultValue={admin.email} required /></label>
        <button className="admin-action primary" type="submit">Save profile</button>
      </form>
    </section>

    <section className="admin-table-wrap settings-panel">
      <div className="admin-section-head"><div><p className="eyebrow">Security</p><h2>Change password</h2></div></div>
      <form action={changeAdminPassword} className="admin-form settings-content">
        <label className="field"><span>Current password</span><input name="currentPassword" type="password" autoComplete="current-password" required /></label>
        <label className="field"><span>New password</span><input name="newPassword" type="password" autoComplete="new-password" minLength={8} required /></label>
        <label className="field"><span>Confirm password</span><input name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required /></label>
        <button className="admin-action primary" type="submit">Update password</button>
      </form>
    </section>

    <section className="admin-table-wrap settings-panel">
      <div className="admin-section-head"><div><p className="eyebrow">System</p><h2>Operational notes</h2></div></div>
      <div className="settings-content"><p className="settings-note">Environment secrets and database credentials remain server-side only and are never exposed in this panel.</p></div>
    </section>
  </div></main>;
}
