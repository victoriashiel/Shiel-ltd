'use client';

import { useInView } from 'motion/react';
import { useRef } from 'react';
import { AnimatedNumber } from '@/components/ui/animated-number';

// Counts up from zero the first time the number scrolls into view.
export function CountUp({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  return (
    <>
      <span ref={ref} aria-hidden="true">
        {prefix}
        <AnimatedNumber value={seen ? value : 0} />
        {suffix}
      </span>
      {/* The real figure for screen readers and crawlers, whatever the animation is doing. */}
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
    </>
  );
}
