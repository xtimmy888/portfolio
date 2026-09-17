"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/** Parse "#rrggbb" / "#rgb" into [r,g,b]. Falls back to emerald. */
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.trim().replace("#", "");
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return [r, g, b];
  }
  if (clean.length === 6) {
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  }
  return [52, 211, 153];
}

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

const CONFIG = {
  density: 1 / 14000, // particles per px² (scales with viewport)
  maxParticles: 90,
  maxSpeed: 0.35,
  radiusMin: 1,
  radiusMax: 2.2,
  linkDistance: 140,
  mouseInfluence: 150,
};

/**
 * Animated constellation background drawn on a fixed full-screen canvas.
 * - Reads the current --accent color so it matches the active theme.
 * - Honors prefers-reduced-motion (renders a single static frame).
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let rgb: [number, number, number] = hexToRgb(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#34d399",
    );

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    function buildParticles() {
      const target = Math.min(
        CONFIG.maxParticles,
        Math.floor(width * height * CONFIG.density),
      );
      particles = Array.from({ length: target }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-CONFIG.maxSpeed, CONFIG.maxSpeed),
        vy: rand(-CONFIG.maxSpeed, CONFIG.maxSpeed),
        r: rand(CONFIG.radiusMin, CONFIG.radiusMax),
      }));
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    }

    function draw() {
      const [r, g, b] = rgb;
      ctx!.clearRect(0, 0, width, height);

      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const c = particles[j];
          const dx = a.x - c.x;
          const dy = a.y - c.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONFIG.linkDistance) {
            const alpha = (1 - dist / CONFIG.linkDistance) * 0.18;
            ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(c.x, c.y);
            ctx!.stroke();
          }
        }
      }

      // particles
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},0.7)`;
        ctx!.fill();
      }
    }

    function step() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CONFIG.mouseInfluence && dist > 0.001) {
          const force = (CONFIG.mouseInfluence - dist) / CONFIG.mouseInfluence;
          p.vx += (dx / dist) * force * 0.02;
          p.vy += (dy / dist) * force * 0.02;
          p.vx *= 0.98;
          p.vy *= 0.98;
        }
      }
      draw();
      raf = requestAnimationFrame(step);
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    if (prefersReduced) {
      draw(); // single static frame
    } else {
      step();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
    // Re-run when theme changes so particle color tracks the accent.
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-70"
    />
  );
}
