/* =====================================================
   script.js
   Purpose:
   - Handle small, page-level behavior
   - Keep JavaScript minimal for this static portfolio
   ===================================================== */

/* -----------------------------------------------------
   FOOTER: AUTO-UPDATE COPYRIGHT YEAR
   -----------------------------------------------------
   This script finds the HTML element with id="year"
   and inserts the current year automatically.

   HTML reference:
   <span id="year"></span>

   This avoids having to manually update the year
   every January.
----------------------------------------------------- */


/* =====================================================
   script.js
   - Auto-updates footer year
   - Renders a particle background on <canvas>
   ===================================================== */

/* -----------------------------------------------------
   FOOTER: AUTO-UPDATE COPYRIGHT YEAR
----------------------------------------------------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* -----------------------------------------------------
   PARTICLE BACKGROUND (Canvas)
   What it does:
   - Creates particles that move around the screen
   - Draws faint lines between nearby particles
   - Slightly reacts to mouse position
----------------------------------------------------- */

const canvas = document.getElementById("particle-canvas");

// If the canvas doesn't exist, skip the particle system safely
if (canvas) {
  const ctx = canvas.getContext("2d");

  // -----------------------------
  // Configuration (tweakable)
  // -----------------------------
  const CONFIG = {
    particleCount: 70,     // more = denser (watch performance)
    maxSpeed: 0.45,        // particle velocity
    radiusMin: 1.0,
    radiusMax: 2.2,
    linkDistance: 130,     // line appears if particles are within this distance
    mouseInfluence: 130,   // particles gently drift away/toward mouse within this radius
  };

  // Tracks canvas size (we need to match device pixel ratio for crispness)
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    // Set the CSS size (logical pixels)
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    // Set the actual drawing buffer size (physical pixels)
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);

    // Scale drawing operations so coordinates remain in logical pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Mouse tracking (for subtle interaction)
  const mouse = { x: null, y: null };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // -----------------------------
  // Particle model
  // -----------------------------
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function makeParticle() {
    return {
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      vx: rand(-CONFIG.maxSpeed, CONFIG.maxSpeed),
      vy: rand(-CONFIG.maxSpeed, CONFIG.maxSpeed),
      r: rand(CONFIG.radiusMin, CONFIG.radiusMax),
    };
  }

  const particles = Array.from({ length: CONFIG.particleCount }, makeParticle);

  // Keep particles within bounds by bouncing off edges
  function updateParticle(p) {
    p.x += p.vx;
    p.y += p.vy;

    // Bounce on edges
    if (p.x <= 0 || p.x >= window.innerWidth) p.vx *= -1;
    if (p.y <= 0 || p.y >= window.innerHeight) p.vy *= -1;

    // Optional: mouse influence (very light push)
    if (mouse.x !== null && mouse.y !== null) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);

      if (dist < CONFIG.mouseInfluence && dist > 0.0001) {
        // Push factor decreases with distance
        const force = (CONFIG.mouseInfluence - dist) / CONFIG.mouseInfluence;

        // Normalize direction and apply a tiny push
        p.vx += (dx / dist) * force * 0.02;
        p.vy += (dy / dist) * force * 0.02;

        // Slight damping so velocity doesn't blow up over time
        p.vx *= 0.98;
        p.vy *= 0.98;
      }
    }
  }

  // -----------------------------
  // Drawing
  // -----------------------------
  function clear() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

    // Particle color (subtle)
    ctx.fillStyle = "rgba(116, 209, 88, 0.9)";
    ctx.fill();
  }

  function drawLinks() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONFIG.linkDistance) {
          // Opacity fades with distance
          const alpha = 1 - dist / CONFIG.linkDistance;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);

          // Line color (subtle)
          ctx.strokeStyle = `rgba(116, 209, 88, ${alpha*0.18})`;
          ctx.stroke();
        }
      }
    }
  }

  // -----------------------------
  // Animation loop
  // -----------------------------
  function animate() {
    clear();

    // Draw connecting lines first, then particles on top
    drawLinks();

    for (const p of particles) {
      updateParticle(p);
      drawParticle(p);
    }

    requestAnimationFrame(animate);
  }

  // -----------------------------
  // Boot up
  // -----------------------------
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  animate();
}

