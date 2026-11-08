"use client";

import { useEffect, useRef } from "react";
import { renderers, type ArtName } from "../art/render";

export type Grid = Readonly<{ cols: number; rows: number }>;

// Draws one of the procedural pieces. The server renders the first frame so the page is complete
// without JavaScript; in the browser the same picture keeps moving, about ten frames a second,
// only while it is on screen and only if the reader hasn't asked for reduced motion.
//
// `wide` and `narrow` are two grids for the same picture; CSS shows one or the other, so the
// layout never jumps when the script loads.
export function AsciiArt({
  name,
  wide,
  narrow,
  label,
  className,
}: {
  name: ArtName;
  wide: Grid;
  narrow?: Grid;
  label: string;
  className?: string;
}) {
  const wideRef = useRef<HTMLPreElement>(null);
  const narrowRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const render = renderers[name];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = [
      { el: wideRef.current, grid: wide },
      { el: narrowRef.current, grid: narrow },
    ].filter((x): x is { el: HTMLPreElement; grid: Grid } => Boolean(x.el && x.grid));

    let visible = false;
    let frame = 0;
    let last = 0;
    const start = performance.now();

    const draw = (now: number) => {
      frame = 0;
      if (!visible || motion.matches || document.hidden) return;
      if (now - last >= 100) {
        last = now;
        const t = (now - start) / 1000;
        for (const { el, grid } of targets) {
          if (el.offsetParent !== null) el.textContent = render(grid.cols, grid.rows, t);
        }
      }
      frame = requestAnimationFrame(draw);
    };
    const kick = () => {
      if (!frame && visible && !motion.matches && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      kick();
    });
    const root = (wideRef.current ?? narrowRef.current)?.parentElement;
    if (root) observer.observe(root);
    motion.addEventListener("change", kick);
    document.addEventListener("visibilitychange", kick);

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", kick);
      document.removeEventListener("visibilitychange", kick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [name, wide, narrow]);

  const render = renderers[name];
  return (
    <div className={`ascii ${className ?? ""}`} role="img" aria-label={label}>
      <pre ref={wideRef} className={narrow ? "ascii-wide" : undefined} style={{ "--cols": wide.cols } as React.CSSProperties} aria-hidden="true">
        {render(wide.cols, wide.rows, 0)}
      </pre>
      {narrow ? (
        <pre ref={narrowRef} className="ascii-narrow" style={{ "--cols": narrow.cols } as React.CSSProperties} aria-hidden="true">
          {render(narrow.cols, narrow.rows, 0)}
        </pre>
      ) : null}
    </div>
  );
}
