import { MetadataRoute } from 'next';
import { groq } from 'next-sanity';
import { CACHE_TAGS } from '@/lib/sanity/cache-tags';
import { safeSanityFetch } from '@/lib/sanity/fetch';
import { mockAllArticles } from '@/lib/sanity/mocks';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sayed-portfolio-seven.vercel.app';

  const articlesQuery = groq`*[_type == "article" && !(_id in path("drafts.**")) && status != "archived" && defined(slug.current)] { "slug": slug.current, _updatedAt }`;

  const articles = await safeSanityFetch<Array<{ slug: string; _updatedAt?: string }>>(
    articlesQuery,
    {},
    { next: { tags: [CACHE_TAGS.ARTICLE] } },
    () =>
      mockAllArticles
        .filter((a) => Boolean(a.slug?.current))
        .map((a) => ({ slug: a.slug.current, _updatedAt: a._updatedAt || a.publishedAt }))
  );

  const articleUrls = (articles || [])
    .filter((article) => Boolean(article?.slug))
    .map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article._updatedAt ? new Date(article._updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/certificates`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...articleUrls];
}
