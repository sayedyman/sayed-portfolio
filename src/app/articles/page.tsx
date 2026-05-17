import { getAllArticles } from '@/lib/sanity/queries'
import { ArticlesClient } from './ArticlesClient'

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
