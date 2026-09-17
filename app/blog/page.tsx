import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on quantitative finance, machine learning, and scientific computing by Tahmid Zalal.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section className="pt-28">
      <SectionHeading
        eyebrow="Blog"
        title="Writing"
        description="Notes from my work in quant, machine learning, and scientific computing."
      />

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet — check back soon.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--accent)_40%,var(--border))]"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-muted">
                  <time>{formatDate(post.date)}</time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>

                <h2 className="mt-2 flex items-start justify-between gap-3 text-xl font-semibold tracking-tight">
                  <span className="transition-colors group-hover:text-accent">
                    {post.title}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </h2>

                <p className="mt-2 text-muted">{post.description}</p>

                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
