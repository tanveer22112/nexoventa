export function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ProfessionalService", name: "Nexoventa Medical Billing & RCM", url: baseUrl, description: "Medical billing, revenue cycle management, and practical training from Gilgit-Baltistan.", telephone: "+923488881953", email: "alijanbasharat@gmail.com", address: { "@type": "PostalAddress", addressLocality: "Karim Town", addressRegion: "Gilgit-Baltistan", addressCountry: "PK" }, founder: { "@type": "Person", name: "Basharat Ali Jan" } }) }} />;
}
