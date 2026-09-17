import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/blog";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.description };
}

const prettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: true,
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section className="pt-28">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <time>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{post.description}</p>
          {post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          )}
        </header>

        <article className="mdx mt-10">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
              },
            }}
          />
        </article>
      </div>
    </Section>
  );
}
