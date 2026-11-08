"use client";

import { useEffect, useRef } from "react";
import { lighthouse } from "../data/ascii";

const FRAME_MS = 600;

export function Lighthouse() {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let i = 0;
    let timer = 0;
    let visible = true;

    const start = () => {
      if (timer || !visible || document.hidden) return;
      timer = window.setInterval(() => {
        i += 1;
        node.textContent = lighthouse(i);
      }, FRAME_MS);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    const onVisibility = () => (document.hidden ? stop() : start());

    observer.observe(node);
    document.addEventListener("visibilitychange", onVisibility);
    start();
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <pre ref={ref} className="art lighthouse" aria-hidden="true">
      {lighthouse(0)}
    </pre>
  );
}
