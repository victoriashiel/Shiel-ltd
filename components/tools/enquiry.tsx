'use client';

import { AnimatePresence, m } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Copy, ShieldAlert } from 'lucide-react';
import { useId, useState, useSyncExternalStore } from 'react';
import { whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from '@/components/ui/primitives';

const topics = ['Tax and compliance', 'Bookkeeping and payroll', 'Advisory and growth', 'International accounting', 'Packages and pricing', 'Switching accountant', 'Company formation', 'Existing client', 'Something else'];
const countries = ['Ireland', 'United Kingdom', 'Gibraltar', 'More than one', 'Somewhere else'];
const kinds = ['Limited company', 'Sole trader', 'Contractor', 'Online seller', 'Not set up yet'];
const countryLabel: Record<string, string> = { ireland: 'Ireland', 'united-kingdom': 'United Kingdom', gibraltar: 'Gibraltar' };

const noop = () => () => {};
const readQuery = () => window.location.search;

type Form = { topic: string; country: string; kind: string; deadline: string; name: string; email: string; phone: string; business: string; message: string };

export function Enquiry() {
  const query = useSyncExternalStore(noop, readQuery, () => '');
  const params = new URLSearchParams(query);
  const plan = params.get('plan');
  const presetCountry = countryLabel[params.get('country') ?? ''] ?? '';

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<Form>({ topic: '', country: '', kind: '', deadline: '', name: '', email: '', phone: '', business: '', message: '' });
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);
  const ids = { name: useId(), email: useId(), phone: useId(), business: useId(), message: useId(), deadline: useId() };

  // A plan chosen on the packages page prefills the first two steps.
  const f: Form = { ...form, topic: form.topic || (plan ? 'Packages and pricing' : ''), country: form.country || presetCountry };
  const set = (k: keyof Form, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const errors = {
    name: f.name.trim().length < 2 ? 'Please tell us your name.' : '',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()) ? '' : 'Please enter an email address we can reply to.',
    message: f.message.trim().length < 15 ? 'A sentence or two about what you need helps us reply properly.' : '',
  };
  const valid = [!!f.topic, !!f.country && !!f.kind, !errors.name && !errors.email && !errors.message];

  const text = [
    `Hi Shiel, my name is ${f.name.trim()}.`,
    f.business ? `Business: ${f.business}` : null,
    `Enquiry: ${f.topic}${plan ? ` (${plan})` : ''}`,
    `Where: ${f.country} · ${f.kind}`,
    f.deadline ? `Deadline in view: ${f.deadline}` : null,
    '',
    f.message.trim(),
    '',
    `Email: ${f.email.trim()}${f.phone ? ` · Phone: ${f.phone}` : ''}`,
  ]
    .filter((x): x is string => typeof x === 'string')
    .join('\n');

  const go = (n: number) => {
    if (n > step && !valid[step]) {
      setTouched(true);
      return;
    }
    setTouched(false);
    setDir(n > step ? 1 : -1);
    setStep(n);
  };

  const chips = (key: 'topic' | 'country' | 'kind', list: string[], label: string) => (
    <fieldset>
      <legend className="mb-3 font-display text-lg font-semibold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {list.map((o) => {
          const on = f[key] === o;
          return (
            <label key={o} className={`cursor-pointer rounded-full border px-4 py-2.5 text-[0.95rem] font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-bright ${on ? 'border-ink bg-ink text-bg' : 'border-line bg-surface hover:border-line-strong'}`}>
              <input type="radio" name={key} value={o} checked={on} onChange={() => set(key, o)} className="sr-only" />
              {on && <Check className="-ml-1 mr-1.5 inline size-4" aria-hidden="true" />}
              {o}
            </label>
          );
        })}
      </div>
    </fieldset>
  );

  const field = (k: 'name' | 'email' | 'phone' | 'business', label: string, type = 'text', auto?: string, optional?: boolean) => {
    const err = touched && k in errors ? errors[k as keyof typeof errors] : '';
    return (
      <div>
        <label htmlFor={ids[k]} className="mb-1.5 block font-semibold">
          {label} {optional && <span className="font-normal text-muted">(optional)</span>}
        </label>
        <input
          id={ids[k]}
          type={type}
          autoComplete={auto}
          value={f[k]}
          onChange={(e) => set(k, e.target.value)}
          aria-invalid={!!err}
          aria-describedby={err ? `${ids[k]}-err` : undefined}
          className="h-13 w-full rounded-2xl border border-line bg-surface px-4 text-base outline-none transition focus:border-brand-bright focus:ring-4 focus:ring-brand-bright/15 aria-[invalid=true]:border-clay"
        />
        {err && (
          <p id={`${ids[k]}-err`} className="mt-1.5 text-sm text-clay-ink">
            {err}
          </p>
        )}
      </div>
    );
  };

  const titles = ['What can we help with?', 'Where is the business?', 'How do we reach you?', 'Ready to send'];

  return (
    <div className="card overflow-hidden shadow-card">
      <div className="border-b border-line p-5 sm:px-8">
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-semibold text-muted">
            Step {Math.min(step + 1, 4)} of 4
          </p>
          {plan && <p className="rounded-full bg-clay-soft px-3 py-1 text-xs font-semibold text-clay-ink">{plan}</p>}
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-1.5 overflow-hidden rounded-full bg-surface-2">
              <m.span className="block h-full rounded-full bg-brand-bright" initial={false} animate={{ width: i <= step ? '100%' : '0%' }} transition={{ duration: 0.35 }} />
            </span>
          ))}
        </div>
        <h2 className="mt-5 text-2xl sm:text-3xl" aria-live="polite">
          {titles[step]}
        </h2>
      </div>

      <form
        className="p-5 sm:p-8"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          go(step + 1);
        }}
      >
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <m.div key={step} custom={dir} initial={{ opacity: 0, x: dir * 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -28 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="grid gap-6">
            {step === 0 && (
              <>
                {chips('topic', topics, 'Choose the closest match')}
                {touched && !valid[0] && <p className="text-sm text-clay-ink">Please choose one to continue.</p>}
              </>
            )}
            {step === 1 && (
              <>
                {chips('country', countries, 'Country')}
                {chips('kind', kinds, 'How you trade')}
                <div>
                  <label htmlFor={ids.deadline} className="mb-1.5 block font-semibold">
                    Any deadline in view? <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input id={ids.deadline} value={f.deadline} onChange={(e) => set('deadline', e.target.value)} placeholder="For example, CT1 due 23 November" className="h-13 w-full rounded-2xl border border-line bg-surface px-4 outline-none transition focus:border-brand-bright focus:ring-4 focus:ring-brand-bright/15" />
                </div>
                {touched && !valid[1] && <p className="text-sm text-clay-ink">Please choose a country and how you trade.</p>}
              </>
            )}
            {step === 2 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  {field('name', 'Your name', 'text', 'name')}
                  {field('email', 'Email', 'email', 'email')}
                  {field('phone', 'Phone', 'tel', 'tel', true)}
                  {field('business', 'Business name', 'text', 'organization', true)}
                </div>
                <div>
                  <label htmlFor={ids.message} className="mb-1.5 block font-semibold">
                    How can we help?
                  </label>
                  <textarea
                    id={ids.message}
                    rows={5}
                    value={f.message}
                    onChange={(e) => set('message', e.target.value)}
                    aria-invalid={touched && !!errors.message}
                    aria-describedby={`${ids.message}-hint`}
                    className="w-full rounded-2xl border border-line bg-surface p-4 outline-none transition focus:border-brand-bright focus:ring-4 focus:ring-brand-bright/15 aria-[invalid=true]:border-clay"
                  />
                  <p id={`${ids.message}-hint`} className={`mt-1.5 text-sm ${touched && errors.message ? 'text-clay-ink' : 'text-muted'}`}>
                    {touched && errors.message ? errors.message : 'Give us the context, but leave out passwords, bank details and tax numbers.'}
                  </p>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <pre className="max-h-72 overflow-auto rounded-2xl bg-surface-2 p-5 font-sans text-sm whitespace-pre-wrap text-ink-2">{text}</pre>
                <div className="flex gap-3 rounded-2xl bg-clay-soft/60 p-4 text-sm">
                  <ShieldAlert className="size-5 shrink-0 text-clay-ink" aria-hidden="true" />
                  <p>Please check there is nothing sensitive above. Once the scope is clear we will arrange a secure way to share documents.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <a href={whatsappLink(text)} target="_blank" rel="noopener" className="btn btn-whatsapp btn-block">
                    <WhatsAppIcon className="size-5" />
                    Send on WhatsApp
                  </a>
                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(text);
                        setCopied(true);
                      } catch {}
                    }}
                  >
                    <Copy className="size-4" aria-hidden="true" />
                    {copied ? 'Copied' : 'Copy the message'}
                  </button>
                </div>
                <p className="text-sm text-muted" aria-live="polite">
                  WhatsApp opens with your message ready to send. Your named accountant replies within one business day.
                </p>
              </>
            )}
          </m.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => go(step - 1)} className="flex items-center gap-2 rounded-full px-4 py-3 font-semibold text-muted transition hover:bg-surface-2 hover:text-ink">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back
            </button>
          ) : (
            <span />
          )}
          {step < 3 && (
            <button type="submit" className="btn btn-dark">
              {step === 2 ? 'Review' : 'Continue'}
              <span className="btn-icon" aria-hidden="true">
                <ArrowRight className="size-4" />
              </span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
