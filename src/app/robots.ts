import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sayedelghanam.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/sayed-admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
