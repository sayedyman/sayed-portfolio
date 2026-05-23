import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { InteractiveElements } from "@/components/layout/InteractiveElements";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sayed-portfolio-seven.vercel.app"),
  title: {
    default: "Sayed Elghanam | UI/UX & Product Designer",
    template: "%s | Sayed Elghanam",
  },
  description: "Portfolio of Sayed Ayman Elghanam, a UI/UX and Product Designer crafting intuitive digital experiences, SaaS platforms, UX case studies, and design articles.",
  keywords: [
    "UI/UX Designer",
    "Product Designer",
    "UX Portfolio",
    "UI Design",
    "Case Studies",
    "UX Articles",
    "SaaS Design",
    "Web Design",
    "Sayed Elghanam",
    "Sayed Ayman Elghanam"
  ],
  authors: [{ name: "Sayed Ayman Elghanam", url: "https://sayed-portfolio-seven.vercel.app" }],
  creator: "Sayed Ayman Elghanam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Sayed Elghanam | UI/UX & Product Designer",
    description: "Portfolio of Sayed Ayman Elghanam, a UI/UX and Product Designer crafting intuitive digital experiences, SaaS platforms, UX case studies, and design articles.",
    siteName: "Sayed Elghanam Portfolio",
    images: [
      {
        url: "/sayed-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Sayed Elghanam - UI/UX & Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayed Elghanam | UI/UX & Product Designer",
    description: "Portfolio of Sayed Ayman Elghanam, a UI/UX and Product Designer crafting intuitive digital experiences, SaaS platforms, UX case studies, and design articles.",
    images: ["/sayed-portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col relative selection:bg-primary selection:text-primary-foreground">
        <InteractiveElements />
        <div className="bg-grain" />
        <Navbar />
        <main className="flex-1 pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
