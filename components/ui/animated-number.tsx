'use client';

import { useEffect, useRef } from 'react';

const ease = (t: number) => 1 - Math.pow(1 - t, 4);
const defaultFormat = (n: number) => Math.round(n).toLocaleString('en-IE');

// Tweens between values with requestAnimationFrame; the final value is always in the DOM for crawlers.
export function AnimatedNumber({ value, format = defaultFormat, className }: { value: number; format?: (n: number) => string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(value);

  useEffect(() => {
    const el = ref.current;
    const start = from.current;
    from.current = value;
    if (!el || start === value || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (el) el.textContent = format(value);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - t0) / 600, 1);
      el.textContent = format(start + (value - start) * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, format]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`}>
      {format(value)}
    </span>
  );
}
