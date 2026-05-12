import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { InteractiveElements } from "@/components/layout/InteractiveElements";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sayed Ayman Elghanam | UI/UX Designer",
  description: "Premium cinematic UI/UX designer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative selection:bg-primary selection:text-primary-foreground">
        <InteractiveElements />
        <div className="bg-grain" />
        <Navbar />
        <main className="flex-1 flex flex-col pt-24">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
