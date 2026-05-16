import { getAllArticles } from '@/lib/sanity/queries'
import { ArticlesClient } from './ArticlesClient'

export const revalidate = 60

export default async function ArticlesPage() {
  const articles = await getAllArticles()
  return <ArticlesClient articles={articles} />
}
