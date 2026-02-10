"use client";

import { useRef, useEffect, useCallback } from "react";

interface ElectricCanvasProps {
  className?: string;
  /** Duration of the full burst cycle in ms */
  duration?: number;
}

/**
 * Realistic sky-lightning overlay — 2-3 bolts strike from the top,
 * flash bright then vanish, just like real thunderbolts.
 * Auto-fires on scroll-into-view; replays on re-entry.
 */
export default function ElectricCanvas({
  className = "",
  duration = 1800,
}: ElectricCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isRunning = useRef(false);
  const animId = useRef<number>(0);
  const startTime = useRef(0);

  /**
   * Build a jagged lightning path from top to a target point.
   * Returns an array of {x,y} waypoints.
   */
  const buildPath = useCallback(
    (x1: number, y1: number, x2: number, y2: number): { x: number; y: number }[] => {
      const points: { x: number; y: number }[] = [{ x: x1, y: y1 }];
      const segments = 12 + Math.floor(Math.random() * 6);

      for (let i = 1; i < segments; i++) {
        const t = i / segments;
        // Each segment drifts sideways with decreasing jitter toward the end
        const jitterX = (1 - t * 0.5) * (Math.random() - 0.5) * 50;
        const jitterY = (Math.random() - 0.5) * 6;
        points.push({
          x: x1 + (x2 - x1) * t + jitterX,
          y: y1 + (y2 - y1) * t + jitterY,
        });
      }
      points.push({ x: x2, y: y2 });
      return points;
    },
    []
  );

  /** Draw a single bolt path with glow + core + white-hot center */
  const drawPath = useCallback(
    (ctx: CanvasRenderingContext2D, points: { x: number; y: number }[], alpha: number) => {
      if (alpha < 0.01) return;

      const stroke = (color: string, width: number, blur: number, shadowColor: string) => {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.shadowBlur = blur;
        ctx.shadowColor = shadowColor;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      };

      ctx.save();

      // Layer 1: Wide diffuse glow
      stroke(
        `rgba(100, 140, 255, ${alpha * 0.15})`,
        12,
        40,
        `rgba(80, 120, 255, ${alpha * 0.4})`
      );

      // Layer 2: Medium blue core
      stroke(
        `rgba(140, 180, 255, ${alpha * 0.6})`,
        2.5,
        15,
        `rgba(120, 160, 255, ${alpha * 0.6})`
      );

      // Layer 3: Bright white-hot center
      stroke(
        `rgba(220, 230, 255, ${alpha * 0.9})`,
        1,
        6,
        `rgba(255, 255, 255, ${alpha * 0.5})`
      );

      ctx.restore();
    },
    []
  );

  /** Draw a small branch off a main bolt */
  const drawBranch = useCallback(
    (ctx: CanvasRenderingContext2D, origin: { x: number; y: number }, alpha: number) => {
      const len = 25 + Math.random() * 50;
      const angle = Math.PI / 2 + (Math.random() - 0.5) * 1.2; // mostly downward
      const endX = origin.x + Math.cos(angle) * len * (Math.random() > 0.5 ? 1 : -1);
      const endY = origin.y + Math.sin(angle) * len;

      const pts: { x: number; y: number }[] = [{ x: origin.x, y: origin.y }];
      const segs = 4 + Math.floor(Math.random() * 3);
      for (let i = 1; i < segs; i++) {
        const t = i / segs;
        pts.push({
          x: origin.x + (endX - origin.x) * t + (Math.random() - 0.5) * 15,
          y: origin.y + (endY - origin.y) * t + (Math.random() - 0.5) * 4,
        });
      }
      pts.push({ x: endX, y: endY });
      drawPath(ctx, pts, alpha * 0.4);
    },
    [drawPath]
  );

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRunning.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isRunning.current = true;
    startTime.current = performance.now();

    // Pre-generate 2–3 bolts, each with its own timing
    const count = 2 + (Math.random() > 0.5 ? 1 : 0); // 2 or 3
    const bolts = Array.from({ length: count }, (_, i) => {
      const startX = canvas.width * (0.25 + Math.random() * 0.5);
      const endX = canvas.width * (0.3 + Math.random() * 0.4);
      const endY = canvas.height * (0.5 + Math.random() * 0.3);

      return {
        path: buildPath(startX, -5, endX, endY),
        // Stagger each bolt slightly
        strikeTime: i * 250 + Math.random() * 150,
        // Each bolt visible for a short flash
        flashDuration: 300 + Math.random() * 200,
        // Branch points
        branches: Array.from(
          { length: 1 + Math.floor(Math.random() * 2) },
          () => Math.floor(3 + Math.random() * 8)
        ),
      };
    });

    function animate(now: number) {
      const elapsed = now - startTime.current;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      let anyActive = false;

      for (const bolt of bolts) {
        const boltElapsed = elapsed - bolt.strikeTime;
        if (boltElapsed < 0) {
          anyActive = true;
          continue;
        }

        const flashProgress = boltElapsed / bolt.flashDuration;
        if (flashProgress > 1) continue;

        anyActive = true;

        // Sky-lightning flash pattern: instant on, quick flicker, fade
        let alpha: number;
        if (flashProgress < 0.05) {
          // Instant bright flash
          alpha = 1;
        } else if (flashProgress < 0.15) {
          // Quick dim
          alpha = 0.3;
        } else if (flashProgress < 0.25) {
          // Second flash (re-strike)
          alpha = 0.9;
        } else if (flashProgress < 0.4) {
          // Another dim
          alpha = 0.2 + Math.random() * 0.3;
        } else {
          // Fade out
          alpha = Math.max(0, 1 - (flashProgress - 0.4) / 0.6) * 0.5;
        }

        // Regenerate path slightly each frame for a "crawling" effect
        if (Math.random() > 0.6) {
          bolt.path = buildPath(
            bolt.path[0].x,
            bolt.path[0].y,
            bolt.path[bolt.path.length - 1].x,
            bolt.path[bolt.path.length - 1].y
          );
        }

        drawPath(ctx!, bolt.path, alpha);

        // Draw branches
        for (const branchIdx of bolt.branches) {
          if (branchIdx < bolt.path.length) {
            drawBranch(ctx!, bolt.path[branchIdx], alpha);
          }
        }

        // Brief full-screen flash on first strike
        if (flashProgress < 0.05) {
          ctx!.fillStyle = `rgba(180, 200, 255, 0.04)`;
          ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
        }
      }

      if (anyActive && elapsed < duration) {
        animId.current = requestAnimationFrame(animate);
      } else {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
        isRunning.current = false;
      }
    }

    animId.current = requestAnimationFrame(animate);
  }, [buildPath, drawBranch, drawPath, duration]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      canvas!.width = canvas!.parentElement?.clientWidth ?? 400;
      canvas!.height = canvas!.parentElement?.clientHeight ?? 500;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => startAnimation(), 300);
        } else {
          cancelAnimationFrame(animId.current);
          isRunning.current = false;
          const ctx = canvas.getContext("2d");
          if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(canvas);

    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(animId.current);
    };
  }, [startAnimation]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
