import { InteractiveElements } from "@/components/layout/InteractiveElements";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/config/site";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col relative">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${SITE_URL}/#person`,
              "name": "Sayed Ayman Elghanam",
              "url": SITE_URL,
              "image": `${SITE_URL}/sayed-portrait.jpg`,
              "jobTitle": "UI/UX & Product Designer",
              "sameAs": [
                "https://www.linkedin.com/in/sayed-ayman/",
                "https://www.behance.net/sayedelghanam1",
                "https://github.com/sayedyman",
                "https://www.youtube.com/@SayedUi-Ux"
              ],
              "knowsAbout": [
                "UI/UX Design",
                "Product Design",
                "Design Systems",
                "User Research",
                "Wireframing & Prototyping",
                "Information Architecture",
                "Usability Testing",
                "SaaS Design",
                "Design Engineering",
                "Figma"
              ]
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              "url": SITE_URL,
              "name": "Sayed Elghanam Portfolio",
              "publisher": {
                "@id": `${SITE_URL}/#person`
              }
            }
          ]
        }}
      />
      <InteractiveElements />
      <div className="bg-grain" />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
