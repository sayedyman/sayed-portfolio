import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Sayed Elghanam',
  description: 'Learn about Sayed Ayman Elghanam, a UI/UX & Product Designer blending sociology, human behavior, and strategy to craft intuitive digital experiences.',
  alternates: {
    canonical: 'https://sayed-portfolio-seven.vercel.app/about',
  },
  openGraph: {
    title: 'About | Sayed Elghanam',
    description: 'Learn about Sayed Ayman Elghanam, a UI/UX Designer blending sociology, human behavior, and strategy to craft intuitive digital experiences.',
    url: 'https://sayed-portfolio-seven.vercel.app/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: 'About | Sayed Elghanam',
    description: 'Learn about Sayed Ayman Elghanam, a UI/UX Designer blending sociology, human behavior, and strategy to craft intuitive digital experiences.',
    images: ['/og-image.png'],
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
