import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getProjectSlugs } from "@/data/projects";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/skills",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = getProjectSlugs().map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
