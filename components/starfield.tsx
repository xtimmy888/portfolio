"use client";

import { useEffect, useRef } from "react";

/** Lightweight static starfield for content pages (drawn once, dark mode only). */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const draw = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const n = Math.min(280, Math.floor((W * H) / 9000));
      for (let i = 0; i < n; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const r = Math.random() * 1.1 + 0.2;
        const a = Math.random() * 0.55 + 0.12;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 6.2832);
        ctx.fillStyle = `rgba(200,215,255,${a})`;
        ctx.fill();
      }
      for (let i = 0; i < 9; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 6);
        g.addColorStop(0, "rgba(180,210,255,0.75)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 6.2832);
        ctx.fill();
      }
    };

    draw();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(draw, 150);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden dark:block"
    />
  );
}
