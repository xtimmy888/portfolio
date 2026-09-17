"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

/** The systems orbiting the galaxy — each dive routes to a real page. */
const OPTIONS: { label: string; sub: string; route: string }[] = [
  { label: "About", sub: "who i am", route: "/about" },
  { label: "Experience", sub: "where i've worked", route: "/experience" },
  { label: "Projects", sub: "selected work", route: "/projects" },
  { label: "Skills", sub: "the stack", route: "/skills" },
  { label: "Blog", sub: "notes & posts", route: "/blog" },
  { label: "Contact", sub: "say hello", route: "/contact" },
];

export function GalaxyExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const canvas = root.querySelector("canvas") as HTMLCanvasElement;
    const flash = root.querySelector(".gx-flash") as HTMLElement;
    if (!canvas || !flash) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let W = window.innerWidth;
    let H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x03040a, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03040a, 0.035);
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);

    // soft round star texture
    const sprite = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const g = c.getContext("2d")!;
      const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, "rgba(255,255,255,1)");
      gr.addColorStop(0.25, "rgba(255,238,210,0.85)");
      gr.addColorStop(0.55, "rgba(150,120,255,0.25)");
      gr.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = gr;
      g.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    })();

    const galaxy = new THREE.Group();
    scene.add(galaxy);

    {
      const count = 24000;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const radius = 9;
      const branches = 5;
      const spin = 1.0;
      const inside = new THREE.Color(0xffd9a0);
      const outside = new THREE.Color(0x6a5cff);
      const c = new THREE.Color();
      for (let i = 0; i < count; i++) {
        const r = Math.pow(Math.random(), 1.6) * radius;
        const ba = ((i % branches) / branches) * Math.PI * 2;
        const sa = r * spin;
        const rnd = () =>
          Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.32 * r;
        pos[i * 3] = Math.cos(ba + sa) * r + rnd();
        pos[i * 3 + 1] = rnd() * 0.42;
        pos[i * 3 + 2] = Math.sin(ba + sa) * r + rnd();
        c.copy(inside).lerp(outside, r / radius);
        col[i * 3] = c.r;
        col[i * 3 + 1] = c.g;
        col[i * 3 + 2] = c.b;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("color", new THREE.BufferAttribute(col, 3));
      galaxy.add(
        new THREE.Points(
          g,
          new THREE.PointsMaterial({
            size: 0.09,
            map: sprite,
            alphaTest: 0.01,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            transparent: true,
          }),
        ),
      );
    }

    {
      const n = 1800;
      const p = new Float32Array(n * 3);
      for (let s = 0; s < n; s++) {
        const rr = 24 + Math.random() * 40;
        const th = Math.random() * 6.283;
        const ph = Math.acos(2 * Math.random() - 1);
        p[s * 3] = rr * Math.sin(ph) * Math.cos(th);
        p[s * 3 + 1] = rr * Math.cos(ph);
        p[s * 3 + 2] = rr * Math.sin(ph) * Math.sin(th);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(p, 3));
      scene.add(
        new THREE.Points(
          g,
          new THREE.PointsMaterial({
            size: 0.14,
            map: sprite,
            color: 0xbcd0ff,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          }),
        ),
      );
    }

    const core = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        color: 0xfff0d0,
      }),
    );
    core.scale.set(2.1, 2.1, 1);
    scene.add(core);

    // option "systems" — bright markers shown only in the selector
    const anchors: {
      a: THREE.Object3D;
      el: HTMLElement;
      star: THREE.Sprite;
      mat: THREE.SpriteMaterial;
    }[] = [];
    const labelEls = Array.from(root.querySelectorAll<HTMLElement>(".gx-label"));
    OPTIONS.forEach((o, i) => {
      const ang = (i / OPTIONS.length) * Math.PI * 2;
      const a = new THREE.Object3D();
      a.position.set(Math.cos(ang) * 5.4, 0.2, Math.sin(ang) * 5.4);
      galaxy.add(a);
      const mat = new THREE.SpriteMaterial({
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        color: 0xbfe6ff,
        opacity: 0,
      });
      const star = new THREE.Sprite(mat);
      star.scale.set(0.9, 0.9, 1);
      a.add(star);
      anchors.push({ a, el: labelEls[i], star, mat });
      routerRef.current.prefetch(o.route);
    });

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.6, 0.5, 0.18);
    composer.addPass(bloom);

    const CENTER = new THREE.Vector3(0, 0, 0);
    const A = new THREE.Vector3(0, 2.4, 10);
    const B = new THREE.Vector3(0, 4.0, 7.0);
    const TOP = new THREE.Vector3(0, 17, 0.001);
    const OVER = new THREE.Vector3(0, 13.5, 4.0);
    camera.position.copy(A);
    const look = new THREE.Vector3(0, 0, 0);
    const TILT_MAX = 0.5;

    type Seg = {
      fp: THREE.Vector3;
      tp: THREE.Vector3;
      fl: THREE.Vector3;
      tl: THREE.Vector3;
      dur: number;
      ease: (t: number) => number;
      onUpd?: (e: number) => void;
      onDone?: () => void;
      t0?: number;
    };
    let seg: Seg | null = null;
    const queue: Seg[] = [];
    const ease_io = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const ease_in = (t: number) => t * t * t;
    const go = (
      fp: THREE.Vector3,
      tp: THREE.Vector3,
      fl: THREE.Vector3,
      tl: THREE.Vector3,
      dur: number,
      ease: (t: number) => number,
      onUpd?: (e: number) => void,
      onDone?: () => void,
    ) => queue.push({ fp: fp.clone(), tp: tp.clone(), fl: fl.clone(), tl: tl.clone(), dur, ease, onUpd, onDone });
    const nextSeg = () => {
      seg = queue.shift() || null;
      if (seg) seg.t0 = performance.now();
    };

    let state = "intro";
    let selAnchor: (typeof anchors)[number] | null = null;
    let navigated = false;
    let mx = 0,
      my = 0,
      vel = 0,
      velX = 0,
      dragging = false,
      lastX = 0,
      lastY = 0,
      flatten = false,
      navLock = 0;

    const setState = (s: string) => {
      state = s;
      root.dataset.state = s;
    };
    const busy = () => seg !== null || state === "moving" || state === "dive";
    const lock = (ms: number) => (navLock = performance.now() + ms + 650);

    const toSelect = () => {
      if (busy() || state !== "intro") return;
      setState("moving");
      flatten = false;
      lock(1200);
      go(camera.position, B, CENTER, CENTER, 1200, ease_io, undefined, () => setState("select"));
      nextSeg();
    };
    const toIntro = () => {
      if (busy() || state !== "select") return;
      setState("moving");
      flatten = false;
      lock(1000);
      go(camera.position, A, CENTER, CENTER, 1000, ease_io, undefined, () => setState("intro"));
      nextSeg();
    };
    const toOverview = () => {
      if (busy() || state !== "select") return;
      setState("moving");
      flatten = true;
      lock(1300);
      go(camera.position, OVER, CENTER, CENTER, 1300, ease_io, undefined, () => setState("overview"));
      nextSeg();
    };
    const fromOverview = () => {
      if (busy() || state !== "overview") return;
      setState("moving");
      flatten = false;
      lock(1100);
      go(camera.position, B, CENTER, CENTER, 1100, ease_io, undefined, () => setState("select"));
      nextSeg();
    };

    // the plunge into a chosen star, then route
    const runDive = (idx: number, leadIn: boolean) => {
      if (state === "dive") return;
      selAnchor = anchors[idx];
      setState("dive");
      navigated = false;
      flatten = false;
      const sp = new THREE.Vector3();
      selAnchor.a.getWorldPosition(sp);
      const star = selAnchor.star;
      const route = OPTIONS[idx].route;
      let diveFrom = camera.position.clone();
      if (leadIn) {
        go(camera.position, B, CENTER, CENTER, 650, ease_io);
        diveFrom = B;
      }
      go(diveFrom, TOP, CENTER, CENTER, leadIn ? 1000 : 1150, ease_io);
      go(TOP, new THREE.Vector3(sp.x, 5.6, sp.z), CENTER, sp, 1050, ease_io);
      go(
        new THREE.Vector3(sp.x, 5.6, sp.z),
        new THREE.Vector3(sp.x, sp.y + 0.3, sp.z),
        sp,
        sp,
        900,
        ease_in,
        (e) => {
          star.scale.setScalar(0.9 + e * e * 26);
          flash.style.opacity = String(Math.max(0, (e - 0.5) / 0.5));
          if (e > 0.9 && !navigated) {
            navigated = true;
            routerRef.current.push(route);
          }
        },
      );
      nextSeg();
    };

    // nav / map click: pass through the selector, then dive
    const diveViaSelector = (idx: number) => {
      if (state === "dive" || state === "moving") return;
      if (state === "select") {
        runDive(idx, false);
        return;
      }
      setState("moving");
      flatten = false;
      go(camera.position, B, CENTER, CENTER, 900, ease_io, undefined, () => {
        setState("select");
        timers.push(setTimeout(() => runDive(idx, false), 520));
      });
      nextSeg();
    };

    const selectOption = (idx: number) => {
      if (busy() || state !== "select") return;
      runDive(idx, false);
    };

    labelEls.forEach((el, i) => {
      const h = (ev: Event) => {
        ev.stopPropagation();
        selectOption(i);
      };
      el.addEventListener("click", h);
      (el as HTMLElement & { _h?: EventListener })._h = h;
    });

    // external trigger from the nav / map cards
    const onGalaxyDive = (ev: Event) => {
      const route = (ev as CustomEvent).detail?.route as string | undefined;
      const idx = OPTIONS.findIndex((o) => o.route === route);
      if (idx >= 0) diveViaSelector(idx);
    };
    window.addEventListener("galaxy-dive", onGalaxyDive as EventListener);

    // input
    const onWheel = (e: WheelEvent) => {
      if (busy() || performance.now() < navLock) return;
      if (state === "intro" && e.deltaY > 0) toSelect();
      else if (state === "select" && e.deltaY > 0) toOverview();
      else if (state === "select" && e.deltaY < 0) toIntro();
      else if (state === "overview" && e.deltaY < 0) fromOverview();
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t && t.closest && t.closest(".gx-ui")) return;
      if (state !== "select" && state !== "intro" && state !== "overview") return;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * -2;
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      galaxy.rotation.y += dx * 0.005;
      vel = dx * 0.005;
      if (state === "intro" || state === "select") {
        galaxy.rotation.x = clamp(galaxy.rotation.x + dy * 0.004, -TILT_MAX, TILT_MAX);
        velX = dy * 0.004;
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => (dragging = false);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointerleave", onUp);

    const v = new THREE.Vector3();
    const projectLabels = () => {
      const show = state === "select";
      let nearest = -Infinity;
      let nIdx = -1;
      for (let i = 0; i < anchors.length; i++) {
        anchors[i].a.getWorldPosition(v);
        v.project(camera);
        const behind = v.z > 1;
        const sx = (v.x * 0.5 + 0.5) * W;
        const sy = (-v.y * 0.5 + 0.5) * H;
        const el = anchors[i].el;
        el.style.transform = `translate(-50%,-50%) translate(${sx}px,${sy}px)`;
        const vis = show && !behind;
        el.style.opacity = vis ? "1" : "0";
        el.style.pointerEvents = vis ? "auto" : "none";
        if (vis && -v.z > nearest) {
          nearest = -v.z;
          nIdx = i;
        }
      }
      for (let j = 0; j < anchors.length; j++)
        anchors[j].el.classList.toggle("gx-focus", j === nIdx && show);
    };

    let raf = 0;
    const animate = () => {
      const now = performance.now();
      if (seg) {
        const t = Math.min(1, (now - (seg.t0 || now)) / seg.dur);
        const e = seg.ease(t);
        camera.position.lerpVectors(seg.fp, seg.tp, e);
        look.lerpVectors(seg.fl, seg.tl, e);
        camera.lookAt(look);
        if (seg.onUpd) seg.onUpd(e);
        if (t >= 1) {
          const d = seg.onDone;
          seg = null;
          if (d) d();
          nextSeg();
        }
      } else {
        if ((state === "intro" || state === "select") && !reduce)
          camera.position.x += (mx * 1.1 - camera.position.x) * 0.04;
        camera.lookAt(0, 0, 0);
      }
      const autoSpin = (state === "intro" || state === "overview") && !reduce ? 0.0011 : 0;
      const canSpin = state === "intro" || state === "select" || state === "overview";
      galaxy.rotation.y += autoSpin + (canSpin && !dragging ? vel : 0);
      if (!dragging) vel *= 0.96;
      if (!dragging && (state === "intro" || state === "select")) {
        galaxy.rotation.x = clamp(galaxy.rotation.x + velX, -TILT_MAX, TILT_MAX);
        velX *= 0.9;
      }
      if (flatten) {
        galaxy.rotation.x += (0 - galaxy.rotation.x) * 0.12;
        velX = 0;
      }
      // fade the section markers: visible only in the selector (or the one being dived into)
      for (const an of anchors) {
        const target = state === "select" ? 1 : state === "dive" && an === selAnchor ? 1 : 0;
        an.mat.opacity += (target - an.mat.opacity) * 0.12;
      }
      composer.render();
      projectLabels();
      raf = requestAnimationFrame(animate);
    };

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      renderer.setSize(W, H);
      composer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // entry intent from the nav / back link (survives client navigation)
    let enter: string | null = null;
    try {
      enter = sessionStorage.getItem("galaxyEnter");
      sessionStorage.removeItem("galaxyEnter");
    } catch {
      /* ignore */
    }
    if (enter === "select") {
      camera.position.copy(B);
      setState("select");
    } else if (enter && enter.startsWith("dive:")) {
      const idx = OPTIONS.findIndex((o) => o.route === `/${enter!.slice(5)}`);
      setState("intro");
      if (idx >= 0) timers.push(setTimeout(() => diveViaSelector(idx), 400));
    } else {
      setState("intro");
    }

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerleave", onUp);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("galaxy-dive", onGalaxyDive as EventListener);
      labelEls.forEach((el) => {
        const h = (el as HTMLElement & { _h?: EventListener })._h;
        if (h) el.removeEventListener("click", h);
      });
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  const dive = (route: string) =>
    window.dispatchEvent(new CustomEvent("galaxy-dive", { detail: { route } }));

  return (
    <div
      ref={containerRef}
      data-state="intro"
      className="group fixed inset-0 z-0 overflow-hidden bg-[#03040a]"
    >
      <canvas className="absolute inset-0 block h-full w-full" />

      {/* intro — name + description, lifted above the core for legibility */}
      <div className="gx-ui pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-data-[state=intro]:opacity-100">
        <div className="absolute inset-x-0 top-[17vh] flex flex-col items-center px-5 text-center">
          <h1 className="text-[clamp(46px,9vw,98px)] font-bold leading-none tracking-tight text-white [text-shadow:0_2px_44px_rgba(0,0,0,0.9)]">
            Tahmid Zalal
          </h1>
          <p className="mt-4 font-mono text-[15px] tracking-wide text-white/90 [text-shadow:0_2px_22px_rgba(0,0,0,0.95)]">
            CS · Physics · Machine Learning
          </p>
        </div>
        <button
          onClick={() => window.dispatchEvent(new WheelEvent("wheel", { deltaY: 1 }))}
          className="pointer-events-auto absolute bottom-14 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-white/75"
        >
          <span className="relative h-[34px] w-[22px] rounded-xl border border-white/40">
            <span className="gx-dot absolute left-1/2 top-1.5 h-1.5 w-[3px] -translate-x-1/2 rounded bg-[#8fd6ff]" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em]">SCROLL TO EXPLORE</span>
        </button>
      </div>

      {/* select hint */}
      <div className="gx-ui pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 text-center font-mono text-[12px] tracking-[0.1em] text-white/65 opacity-0 transition-opacity duration-500 group-data-[state=select]:opacity-100">
        drag to spin &amp; tilt · click a star to enter · scroll ↓ for the overview
      </div>

      {/* option labels (positioned by JS) */}
      <div className="gx-ui pointer-events-none absolute inset-0">
        {OPTIONS.map((o) => (
          <button
            key={o.route}
            className="gx-label absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center whitespace-nowrap rounded-full border border-[#8fd6ff]/35 bg-[#080c1a]/50 px-[15px] py-2 font-mono text-[13px] tracking-[0.06em] text-[#cfe4ff] opacity-0 backdrop-blur-sm transition-[color,border-color,box-shadow] before:mr-2 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#7fd0ff] before:shadow-[0_0_8px_#7fd0ff]"
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* overview — clean top-down map, section links only */}
      <div className="gx-ui pointer-events-none absolute inset-0 flex items-end justify-center px-5 pb-[13vh] opacity-0 transition-opacity duration-700 group-data-[state=overview]:pointer-events-auto group-data-[state=overview]:opacity-100">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {OPTIONS.map((o) => (
            <button
              key={o.route}
              onClick={() => dive(o.route)}
              className="min-w-[130px] rounded-xl border border-white/12 bg-[#070b16]/75 px-4 py-3 text-left backdrop-blur-sm transition-colors hover:border-[#8fd6ff]/60"
            >
              <div className="text-sm font-semibold text-white">{o.label}</div>
              <div className="font-mono text-[11px] text-white/55">{o.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* dive flash */}
      <div className="gx-flash pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-500 [background:radial-gradient(circle_at_50%_50%,#fff_0%,#cfe0ff_25%,#6a5cff_60%,#03040a_100%)]" />
    </div>
  );
}
