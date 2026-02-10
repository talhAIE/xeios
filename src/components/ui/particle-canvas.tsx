"use client";

import React, { useRef, useEffect } from "react";

interface ParticleCanvasProps {
  className?: string;
  /** Particle color — CSS rgba string */
  particleColor?: string;
  /** Line color between nearby particles */
  lineColor?: string;
  /** Line color when mouse is near */
  lineHoverColor?: string;
  /** Background fill — set to "transparent" for no fill */
  bgColor?: string;
  /** Mouse interaction radius in px */
  mouseRadius?: number;
  /** Density divisor — higher = fewer particles (default 12000) */
  density?: number;
}

/**
 * Full-viewport interactive particle network canvas.
 * Renders as an absolutely-positioned layer — place inside a `relative` container.
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: null as number | null, y: null as number | null, radius: mouseRadius };

    // --- Particle class ---
    class Particle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
      color: string;

      constructor(x: number, y: number, dx: number, dy: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }

      update() {
        if (this.x > canvas!.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas!.height || this.y < 0) this.dy = -this.dy;

        // Repel from mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius + this.size) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 5;
            this.y -= (dy / dist) * force * 5;
          }
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    let particles: Particle[] = [];

    function init() {
      particles = [];
      const count = (canvas!.width * canvas!.height) / density;
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas!.width - size * 4) + size * 2;
        const y = Math.random() * (canvas!.height - size * 4) + size * 2;
        const dx = (Math.random() - 0.5) * 0.4;
        const dy = (Math.random() - 0.5) * 0.4;
        particles.push(new Particle(x, y, dx, dy, size, particleColor));
      }
    }

    function connect() {
      const maxDist = (canvas!.width / 7) * (canvas!.height / 7);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDist) {
            const opacity = 1 - distSq / 20000;

            // Brighten lines near the mouse
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

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      if (bgColor === "transparent") {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      } else {
        ctx!.fillStyle = bgColor;
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      }

      for (const p of particles) p.update();
      connect();
    }

    // --- Sizing ---
    function resize() {
      canvas!.width = canvas!.parentElement?.clientWidth ?? window.innerWidth;
      canvas!.height = canvas!.parentElement?.clientHeight ?? window.innerHeight;
      init();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);
    resize();

    // --- Mouse tracking ---
    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onOut = () => { mouse.x = null; mouse.y = null; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerout", onOut);

    animate();

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      cancelAnimationFrame(animationFrameId);
    };
    // Run once on mount — colors/density are static props
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
