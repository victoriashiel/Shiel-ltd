'use client';

import { m, useScroll, useSpring } from 'motion/react';

// A thin bar under the header that fills as you read.
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return <m.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-brand-bright" />;
}
