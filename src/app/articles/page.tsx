import { getAllArticles } from '@/lib/sanity/queries'
import { ArticlesClient } from './ArticlesClient'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journal & UX Articles | Sayed Elghanam',
  description: 'Read articles and insights on UI/UX design, product strategy, design systems, and human-computer interaction by Sayed Elghanam.',
  alternates: { canonical: 'https://sayed-portfolio-seven.vercel.app/articles' },
  openGraph: {
    title: 'Journal & UX Articles | Sayed Elghanam',
    description: 'Read articles and insights on UI/UX design, product strategy, design systems, and human-computer interaction by Sayed Elghanam.',
    url: 'https://sayed-portfolio-seven.vercel.app/articles',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: 'Journal & UX Articles | Sayed Elghanam',
    description: 'Read articles and insights on UI/UX design, product strategy, design systems, and human-computer interaction by Sayed Elghanam.',
    images: ['/og-image.png'],
  }
}

export const revalidate = 60

export default async function ArticlesPage() {
  const articles = await getAllArticles()
  
  if (process.env.NODE_ENV !== 'production') {
    if (articles.length === 0) {
      console.log('[Debug] No published articles found. Verify native publish state and editorial status filtering in Sanity Studio.')
    } else {
      console.log(`[Debug] Fetched ${articles.length} article(s).`)
    }
  }

  return <ArticlesClient articles={articles} />
}
