import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Sayed Elghanam',
  description: 'Get in touch with Sayed Elghanam for freelance UI/UX design, product design, and web app design projects.',
  alternates: {
    canonical: 'https://sayed-portfolio-seven.vercel.app/contact',
  },
  openGraph: {
    title: 'Contact | Sayed Elghanam',
    description: 'Get in touch with Sayed Elghanam for freelance UI/UX design, product design, and web app design projects.',
    url: 'https://sayed-portfolio-seven.vercel.app/contact',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: 'Contact | Sayed Elghanam',
    description: 'Get in touch with Sayed Elghanam for freelance UI/UX design, product design, and web app design projects.',
    images: ['/og-image.png'],
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
