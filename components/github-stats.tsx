"use client";

import { useEffect, useState } from "react";
import { GithubIcon } from "@/components/icons";
import { profile } from "@/data/profile";

type Stats = {
  publicRepos: number;
  followers: number;
  stars: number;
  profileUrl: string;
};

/**
 * Pulls live numbers from our own /api/github endpoint (which proxies the
 * GitHub API). Renders nothing if the request fails, so it never breaks the
 * page.
 */
export function GithubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((data: Stats) => active && setStats(data))
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, []);

  if (failed) return null;

  const items: [string, number | undefined][] = [
    ["Repos", stats?.publicRepos],
    ["Followers", stats?.followers],
    ["Stars", stats?.stars],
  ];

  return (
    <a
      href={profile.socials.github}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-accent">
          <GithubIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-mono text-sm text-accent">GitHub</p>
          <p className="text-xs text-muted">Live from the API</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        {items.map(([label, value]) => (
          <div key={label}>
            <div className="font-mono text-2xl font-bold tracking-tight">
              <span className="text-gradient">
                {value === undefined ? "—" : value}
              </span>
            </div>
            <div className="mt-0.5 text-xs text-muted">{label}</div>
          </div>
        ))}
      </div>
    </a>
  );
}
