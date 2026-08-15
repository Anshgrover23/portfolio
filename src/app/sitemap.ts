import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/data/blogPosts';
import { getProductSlugs } from '@/data/products';
import { getExperienceSlugs } from '@/lib/experienceSlug';
import { SITE_LAST_UPDATED, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getBlogPosts();
  const experienceSlugs = getExperienceSlugs();
  const productSlugs = getProductSlugs();
  const siteLastModified = new Date(SITE_LAST_UPDATED);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: siteLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const experienceRoutes: MetadataRoute.Sitemap = experienceSlugs.map(slug => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: siteLastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const workRoutes: MetadataRoute.Sitemap = productSlugs.map(slug => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified: siteLastModified,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...blogRoutes, ...experienceRoutes, ...workRoutes];
}
