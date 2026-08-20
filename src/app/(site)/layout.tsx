import { InteractiveElements } from "@/components/layout/InteractiveElements";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

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
              "@id": "https://sayed-portfolio-seven.vercel.app/#person",
              "name": "Sayed Ayman Elghanam",
              "url": "https://sayed-portfolio-seven.vercel.app",
              "image": "https://sayed-portfolio-seven.vercel.app/sayed-portrait.jpg",
              "jobTitle": "UI/UX & Product Designer",
              "sameAs": [
                "https://www.linkedin.com/in/sayed-ayman/",
                "https://www.behance.net/sayedelghanam1",
                "https://github.com/sayedyman"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://sayed-portfolio-seven.vercel.app/#website",
              "url": "https://sayed-portfolio-seven.vercel.app",
              "name": "Sayed Elghanam Portfolio",
              "publisher": {
                "@id": "https://sayed-portfolio-seven.vercel.app/#person"
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
