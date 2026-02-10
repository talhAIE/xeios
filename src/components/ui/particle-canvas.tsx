"use client";

import React, { useRef, useEffect, useState } from "react";

interface ParticleCanvasProps {
  className?: string;
  particleColor?: string;
  lineColor?: string;
  lineHoverColor?: string;
  bgColor?: string;
  mouseRadius?: number;
  density?: number;
}

/**
 * Full-viewport interactive particle network canvas.
 * Renders as an absolutely-positioned layer — place inside a `relative` container.
 * Respects prefers-reduced-motion by rendering a single static frame.
 * Uses devicePixelRatio for crisp rendering on HiDPI screens.
 */
export default function ParticleCanvas({
  className = "",
  particleColor = "rgba(167, 100, 220, 0.7)",
  lineColor = "rgba(140, 80, 200, 0.6)",
  lineHoverColor = "rgba(255, 255, 255, 0.6)",
  bgColor = "transparent",
  mouseRadius = 200,
  density = 12000,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    const mouse = { x: null as number | null, y: null as number | null, radius: mouseRadius };

    interface Pt {
      x: number; y: number; dx: number; dy: number; size: number;
    }
    let particles: Pt[] = [];

    function sizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas!.parentElement;
      w = parent?.clientWidth ?? window.innerWidth;
      h = parent?.clientHeight ?? window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      particles = [];
      const count = (w * h) / density;
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * (w - size * 4) + size * 2,
          y: Math.random() * (h - size * 4) + size * 2,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
          size,
        });
      }
    }

    function drawParticle(p: Pt) {
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx!.fillStyle = particleColor;
      ctx!.fill();
    }

    function updateParticle(p: Pt) {
      if (p.x > w || p.x < 0) p.dx = -p.dx;
      if (p.y > h || p.y < 0) p.dy = -p.dy;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius + p.size) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 5;
          p.y -= (dy / dist) * force * 5;
        }
      }

      p.x += p.dx;
      p.y += p.dy;
      drawParticle(p);
    }

    function connect() {
      const maxDist = (w / 7) * (h / 7);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDist) {
            const opacity = 1 - distSq / 20000;
            let isNearMouse = false;
            if (mouse.x !== null && mouse.y !== null) {
              const mx = particles[a].x - mouse.x;
              const my = particles[a].y - mouse.y;
              if (Math.sqrt(mx * mx + my * my) < mouse.radius) isNearMouse = true;
            }
            ctx!.strokeStyle = isNearMouse
              ? lineHoverColor.replace(/[\d.]+\)$/, `${opacity})`)
              : lineColor.replace(/[\d.]+\)$/, `${opacity})`);
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    }

    function clearCanvas() {
      if (bgColor === "transparent") {
        ctx!.clearRect(0, 0, w, h);
      } else {
        ctx!.fillStyle = bgColor;
        ctx!.fillRect(0, 0, w, h);
      }
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      clearCanvas();
      for (const p of particles) updateParticle(p);
      connect();
    }

    function setup() {
      sizeCanvas();
      initParticles();
    }

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animId);
      setup();
      if (!prefersReducedMotion) animate();
      else {
        clearCanvas();
        for (const p of particles) drawParticle(p);
        connect();
      }
    });
    ro.observe(canvas.parentElement ?? canvas);
    setup();

    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onOut = () => { mouse.x = null; mouse.y = null; };

    if (prefersReducedMotion) {
      clearCanvas();
      for (const p of particles) drawParticle(p);
      connect();
    } else {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerout", onOut);
      animate();
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      cancelAnimationFrame(animId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
