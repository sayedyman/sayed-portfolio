import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sayed-portfolio-seven.vercel.app"),
  title: {
    default: "Sayed Elghanam | UI/UX Designer",
    template: "%s | Sayed Elghanam",
  },
  description: "UI/UX Designer crafting modern digital experiences and premium user-centered digital products",
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
    url: "https://sayed-portfolio-seven.vercel.app/",
    title: "Sayed Elghanam | UI/UX Designer",
    description: "UI/UX Designer crafting modern digital experiences and premium user-centered digital products",
    siteName: "Sayed Elghanam Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sayed Elghanam - UI/UX Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayed Elghanam | UI/UX Designer",
    description: "UI/UX Designer crafting modern digital experiences and premium user-centered digital products",
    images: ["/og-image.png"],
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
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: "/favicon.png",
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
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-dvh selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
