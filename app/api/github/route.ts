import { NextResponse } from "next/server";
import { profile } from "@/data/profile";

// Cache the response for an hour so we stay well under GitHub's rate limit.
export const revalidate = 3600;

export async function GET() {
  const username = profile.githubUsername;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-site",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        { headers, next: { revalidate } },
      ),
    ]);

    if (!userRes.ok) {
      throw new Error(`GitHub user request failed: ${userRes.status}`);
    }

    const user = await userRes.json();
    const repos: unknown = reposRes.ok ? await reposRes.json() : [];
    const stars = Array.isArray(repos)
      ? repos.reduce(
          (sum, r) => sum + (Number((r as { stargazers_count?: number }).stargazers_count) || 0),
          0,
        )
      : 0;

    return NextResponse.json({
      username,
      name: user.name as string | null,
      followers: user.followers as number,
      publicRepos: user.public_repos as number,
      stars,
      profileUrl: user.html_url as string,
    });
  } catch (err) {
    console.error("[github] fetch failed:", err);
    return NextResponse.json(
      { error: "Unable to load GitHub stats." },
      { status: 502 },
    );
  }
}
