import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
};

export type Post = PostMeta & { content: string };

function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  if (data.published === false) return null;

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: readingTime(content),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map(({ content: _content, ...meta }) => meta);
}

/** Format an ISO date string as e.g. "May 20, 2026". */
export function formatDate(date: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
