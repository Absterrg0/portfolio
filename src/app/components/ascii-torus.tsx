"use client";

import { useEffect, useRef } from "react";

const COLS = 40;
const ROWS = 20;
const SHADES = ".,-~:;=!*#$@";
const FRAME_MS = 1000 / 24;

// Renders one frame of a lit torus rotated by angles a (about x) and b (about z).
function frame(a: number, b: number): string {
  const out: string[] = new Array(COLS * ROWS).fill(" ");
  const depth = new Float32Array(COLS * ROWS);
  const cosA = Math.cos(a), sinA = Math.sin(a);
  const cosB = Math.cos(b), sinB = Math.sin(b);
  const R1 = 1, R2 = 2, K2 = 5;
  const K1 = ((COLS * K2 * 3) / (8 * (R1 + R2))) * 0.8;

  for (let theta = 0; theta < 6.283; theta += 0.07) {
    const cosT = Math.cos(theta), sinT = Math.sin(theta);
    for (let phi = 0; phi < 6.283; phi += 0.02) {
      const cosP = Math.cos(phi), sinP = Math.sin(phi);
      const cx = R2 + R1 * cosT;
      const cy = R1 * sinT;
      const x = cx * (cosB * cosP + sinA * sinB * sinP) - cy * cosA * sinB;
      const y = cx * (sinB * cosP - sinA * cosB * sinP) + cy * cosA * cosB;
      const z = K2 + cosA * cx * sinP + cy * sinA;
      const ooz = 1 / z;
      const xp = Math.floor(COLS / 2 + K1 * ooz * x);
      // Characters are about twice as tall as they are wide.
      const yp = Math.floor(ROWS / 2 - (K1 / 2) * ooz * y);
      if (xp < 0 || xp >= COLS || yp < 0 || yp >= ROWS) continue;
      const lum =
        cosP * cosT * sinB - cosA * cosT * sinP - sinA * sinT + cosB * (cosA * sinT - cosT * sinA * sinP);
      const i = xp + COLS * yp;
      if (lum > 0 && ooz > depth[i]) {
        depth[i] = ooz;
        out[i] = SHADES[Math.min(SHADES.length - 1, Math.floor(lum * 8))];
      }
    }
  }

  let text = "";
  for (let r = 0; r < ROWS; r++) text += out.slice(r * COLS, (r + 1) * COLS).join("") + "\n";
  return text;
}

export const initialTorus = frame(1.1, 0.6);

export function AsciiTorus() {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let a = 1.1, b = 0.6, raf = 0, last = 0, visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });

    function tick(now: number) {
      raf = 0;
      if (!visible || document.hidden) return;
      if (now - last >= FRAME_MS) {
        last = now;
        a += 0.035;
        b += 0.018;
        node!.textContent = frame(a, b);
      }
      raf = requestAnimationFrame(tick);
    }

    const onVisibility = () => {
      if (!document.hidden && visible && !raf) raf = requestAnimationFrame(tick);
    };

    observer.observe(node);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <pre ref={ref} className="torus" aria-hidden="true" suppressHydrationWarning>
      {initialTorus}
    </pre>
  );
}
