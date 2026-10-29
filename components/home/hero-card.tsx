'use client';

import { m, useInView, useReducedMotion } from 'motion/react';
import { ArrowLeft, CheckCheck, Mic, Paperclip, Phone, Smile, UserRound, Video } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { whatsappLink } from '@/lib/site';

type Message = { from: 'you' | 'them'; time: string; text?: string; list?: { done: boolean; text: string }[] };

const messages: Message[] = [
  { from: 'you', time: '09:12', text: 'Hi, quick one. Can we afford to hire in March?' },
  { from: 'them', time: '09:31', text: 'Yes, if Q1 sales hold. I’ve put the numbers side by side for you.' },
  {
    from: 'them',
    time: '09:32',
    text: 'Where things stand:',
    list: [
      { done: true, text: 'Books reconciled for September' },
      { done: true, text: 'CT1 filed with Revenue' },
      { done: false, text: 'CRO annual return due in 18 days' },
    ],
  },
];

// Faint doodle wallpaper, like a messaging app's chat background.
const wallpaper =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' fill='none' stroke='%23ffffff' stroke-opacity='0.035' stroke-width='1.5'%3E%3Ccircle cx='14' cy='16' r='6'/%3E%3Cpath d='M52 10h14v10H52zM30 50l8 8 12-14M62 56a6 6 0 1 0 0 .1M8 62h12M14 56v12'/%3E%3C/svg%3E\")";

// A small animated illustration of messaging your accountant. Tapping it opens a real WhatsApp chat.
export function HeroCard() {
  const reduce = useReducedMotion();
  // The conversation plays once the card is on screen, which on phones is after scrolling.
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.75 });
  // The first message is server-rendered so the card is never empty before scripts run.
  const [step, setShown] = useState(1);
  const shown = reduce ? messages.length : step;

  useEffect(() => {
    if (reduce || !inView) return;
    if (shown >= messages.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 1300);
    return () => clearTimeout(t);
  }, [shown, reduce, inView]);

  return (
    <a
      ref={ref}
      href={whatsappLink('Hi Shiel, I’d like to talk to an accountant.')}
      target="_blank"
      rel="noopener"
      aria-label="Chat with an accountant on WhatsApp"
      className="group relative mx-auto block w-full max-w-md rounded-[2rem] focus-visible:outline-offset-4"
    >
      <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#21a09a]/25 via-transparent to-[#d4a24c]/20 blur-2xl" />
      <m.div
        initial={reduce ? false : { y: 24, rotate: -1.5 }}
        animate={inView ? { y: 0, rotate: 0 } : undefined}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        aria-hidden="true"
        className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#0b141a] shadow-2xl transition-[border-color,box-shadow] duration-300 group-hover:border-white/25 group-hover:shadow-[0_30px_60px_-20px_rgb(0_168_132/0.45)]"
      >
        <div className="flex items-center gap-3 bg-[#1f2c34] px-3 py-2.5 text-[#aebac1]">
          <ArrowLeft className="size-5" />
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#21a09a] to-[#0f5f5c] text-white">
            <UserRound className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-[#e9edef]">Your accountant</p>
            <p className="text-xs">online</p>
          </div>
          <Video className="size-5" />
          <Phone className="ml-3 size-[1.1rem]" />
        </div>

        <div className="flex min-h-[17.5rem] flex-col gap-1.5 px-3 py-4" style={{ backgroundImage: wallpaper }}>
          <span className="mb-1.5 self-center rounded-lg bg-[#182229] px-2.5 py-1 text-[0.7rem] font-medium text-[#8696a0]">TODAY</span>
          {messages.slice(0, shown).map((msg, i) => {
            const you = msg.from === 'you';
            return (
              <m.div
                key={i}
                initial={reduce || i === 0 ? false : { opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className={`relative max-w-[85%] px-2.5 pt-1.5 pb-1 text-[0.9rem] leading-snug text-[#e9edef] shadow-sm ${
                  you ? 'self-end rounded-lg rounded-tr-none bg-[#005c4b]' : 'self-start rounded-lg rounded-tl-none bg-[#202c33]'
                }`}
              >
                <span className={`absolute top-0 size-2 ${you ? '-right-2 bg-[#005c4b] [clip-path:polygon(0_0,100%_0,0_100%)]' : '-left-2 bg-[#202c33] [clip-path:polygon(0_0,100%_0,100%_100%)]'}`} />
                {msg.text}
                {msg.list && (
                  <span className="mt-1 block space-y-0.5">
                    {msg.list.map((l) => (
                      <span key={l.text} className="block">
                        {l.done ? '✅' : '⏰'} {l.text}
                      </span>
                    ))}
                  </span>
                )}
                <span className="float-right mt-1 ml-3 flex translate-y-0.5 items-center gap-1 text-[0.65rem] text-[#8696a0]">
                  {msg.time}
                  {you && <CheckCheck className="size-3.5 text-[#53bdeb]" />}
                </span>
              </m.div>
            );
          })}
          {shown < messages.length && (
            <span className="flex gap-1 self-start rounded-lg rounded-tl-none bg-[#202c33] px-3 py-2.5">
              {[0, 1, 2].map((d) => (
                <m.span key={d} className="size-1.5 rounded-full bg-[#8696a0]" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }} />
              ))}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 bg-[#0b141a] px-2.5 pb-3">
          <span className="flex flex-1 items-center gap-2.5 rounded-full bg-[#202c33] px-3.5 py-2.5 text-sm text-[#8696a0]">
            <Smile className="size-5" />
            <span className="flex-1">Message</span>
            <Paperclip className="size-[1.1rem]" />
          </span>
          <span className="grid size-11 place-items-center rounded-full bg-[#00a884] text-[#0b141a]">
            <Mic className="size-5" />
          </span>
        </div>
      </m.div>
    </a>
  );
}
