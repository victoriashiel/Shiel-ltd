'use client';

import { AnimatePresence, m, useDragControls, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

// A bottom sheet on phones and a centred dialog on larger screens.
export function Sheet({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  const panel = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const drag = useDragControls();
  // The page stays locked until the sheet has finished sliding away. Unlocking it
  // mid-animation can resize the viewport on phones and make the sheet jump.
  const savedOverflow = useRef<string | null>(null);
  const unlock = () => {
    if (savedOverflow.current === null) return;
    document.body.style.overflow = savedOverflow.current;
    savedOverflow.current = null;
  };

  // Never leave the page locked if the sheet is removed altogether.
  useEffect(
    () => () => {
      if (savedOverflow.current !== null) document.body.style.overflow = savedOverflow.current;
    },
    [],
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    // Only mice and trackpads need the page locked. On touch screens, locking it makes
    // the browser bars move and the page jolt, so the backdrop just ignores swipes instead.
    if (matchMedia('(pointer: fine)').matches && savedOverflow.current === null) {
      savedOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    requestAnimationFrame(() => {
      const first = panel.current?.querySelector<HTMLElement>('[data-autofocus]') ?? panel.current;
      first?.focus({ preventScroll: true });
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // Without a page lock, a swipe on the sheet would scroll the page behind it. Let touches
    // through only where the sheet's own content has somewhere to scroll.
    const onTouchMove = (e: TouchEvent) => {
      const list = body.current;
      const inList = list?.contains(e.target as Node);
      if (!inList || list!.scrollHeight <= list!.clientHeight) e.preventDefault();
    };
    const layer = panel.current?.parentElement;
    layer?.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('keydown', onKey);
    return () => {
      layer?.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('keydown', onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence onExitComplete={unlock}>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center lg:items-start lg:pt-[12vh]">
          <m.div
            className="absolute inset-0 touch-none bg-[#040b0c]/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className={`relative flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-[1.75rem] border border-line bg-bg text-ink shadow-lift outline-none lg:rounded-[1.75rem] ${wide ? 'lg:max-w-2xl' : 'lg:max-w-lg'}`}
            initial={reduce ? { opacity: 0 } : { y: '100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 340 }}
            drag={reduce ? false : 'y'}
            // Only the handle and title bar start a swipe, so tapping a button inside never drags.
            dragControls={drag}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 110 || info.velocity.y > 600) onClose();
            }}
          >
            <div
              className="flex shrink-0 cursor-grab touch-none items-center justify-between px-5 pt-3 pb-2 active:cursor-grabbing lg:cursor-default"
              onPointerDown={(e) => {
                if (!(e.target as HTMLElement).closest('button, a')) drag.start(e);
              }}
            >
              <span aria-hidden="true" className="absolute top-2 left-1/2 h-1.5 w-11 -translate-x-1/2 rounded-full bg-line-strong lg:hidden" />
              <h2 className="pt-3 font-display text-xl font-bold">{title}</h2>
              <button type="button" onClick={onClose} className="mt-2 grid size-10 place-items-center rounded-full bg-surface-2 transition hover:bg-line" aria-label="Close">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div
              ref={body}
              className="overflow-y-auto overscroll-contain px-5 pt-2 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
              onPointerDownCapture={(e) => e.stopPropagation()}
              // Close straight away when a link is tapped, rather than waiting for the next page to load.
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('a[href]')) onClose();
              }}
            >
              {children}
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
