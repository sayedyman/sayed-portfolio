import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';
import { groq } from 'next-sanity';
import { CACHE_TAGS } from '@/lib/sanity/cache-tags';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sayed-portfolio-seven.vercel.app';

  // Fetch dynamic slugs and last updated dates from Sanity
  const projectsQuery = groq`*[_type == "project" && status in ["published", "coming-soon"] && defined(slug.current)] { "slug": slug.current, _updatedAt }`;
  const articlesQuery = groq`*[_type == "article" && !(_id in path("drafts.**")) && status != "archived" && defined(slug.current)] { "slug": slug.current, _updatedAt }`;

  const [projects, articles] = await Promise.all([
    client.fetch(projectsQuery, {}, { next: { tags: [CACHE_TAGS.PROJECT] } }),
    client.fetch(articlesQuery, {}, { next: { tags: [CACHE_TAGS.ARTICLE] } }),
  ]);

  const projectUrls = projects.map((project: any) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const articleUrls = articles.map((article: any) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article._updatedAt),
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
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...projectUrls, ...articleUrls];
}
