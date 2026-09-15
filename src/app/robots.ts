import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sayed-portfolio-seven.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/sayed-admin',
        '/sayed-admin/*',
        '/api',
        '/api/*',
        '/cta-preview',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
