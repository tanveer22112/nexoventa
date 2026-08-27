import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AnnouncementsPage() {
  const announcements = await db.announcement.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });
  return <main><section className="page-intro shell"><p className="eyebrow">Announcements</p><h1>News from<br /><em>Nexoventa.</em></h1><p>New training opportunities and important updates.</p></section><section className="shell faq-list">{announcements.length === 0 ? <div className="empty-state">No announcements have been published yet.</div> : announcements.map((announcement) => <article key={announcement.id}><p className="eyebrow">{announcement.publishedAt?.toLocaleDateString("en-GB")}</p><h2>{announcement.title}</h2><p>{announcement.content}</p></article>)}</section></main>;
}
