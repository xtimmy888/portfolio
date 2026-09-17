"use client";

import dynamic from "next/dynamic";

/** Loads the WebGL galaxy on the client only (three.js needs the DOM). */
const GalaxyExperience = dynamic(
  () => import("./galaxy-experience").then((m) => m.GalaxyExperience),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 grid place-items-center bg-[#03040a]">
        <div className="font-mono text-sm text-white/50">entering the galaxy…</div>
      </div>
    ),
  },
);

export function GalaxyMount() {
  return <GalaxyExperience />;
}
