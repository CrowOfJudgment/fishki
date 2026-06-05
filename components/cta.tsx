"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useT } from "@/lib/i18n-context";

type TallyWindow = Window & {
  Tally?: {
    loadEmbeds?: () => void;
  };
};

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="m3 7.25 2.25 2.25L11 3.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Cta() {
  const t = useT();
  const loadEmbeds = () => {
    (window as TallyWindow).Tally?.loadEmbeds?.();
  };

  useEffect(() => {
    loadEmbeds();
  }, []);

  return (
    <section
      id="cta"
      className="scroll-mt-28 pb-16 pt-10 sm:pb-20 sm:pt-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(244,239,230,0.88))] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.1)] sm:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.1),transparent_28%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-12 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl motion-safe:animate-float"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 bottom-0 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl motion-safe:animate-float"
          />

          <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
            <div className="p-4 sm:p-6 lg:p-8">
              <span className="inline-flex rounded-full border border-blue-500/15 bg-blue-500/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
                {t.cta.badge}
              </span>

              <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-balance text-slate-950 sm:text-4xl lg:text-5xl">
                {t.cta.title}
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                {t.cta.subtitle}
              </p>

              <ul className="mt-8 space-y-4">
                {t.cta.benefits.map((benefit: string) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/15">
                      <CheckIcon />
                    </span>
                    <span className="text-sm leading-7 text-slate-700">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {t.cta.cta}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t.cta.formNote}
                </p>
              </div>
            </div>

            <div className="relative p-1 sm:p-2">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-slate-950/5 blur-2xl"
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200/70 px-5 py-4 sm:px-6">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {t.cta.cta}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {t.cta.formNote}
                    </p>
                  </div>
                </div>

                <div className="bg-[linear-gradient(180deg,rgba(15,23,42,0.03),rgba(15,23,42,0))] p-3 sm:p-4">
                  <div className="overflow-hidden rounded-[1.4rem] border border-slate-200/80 bg-white shadow-inner">
                    <iframe
                      data-tally-src="https://tally.so/embed/ODkPZk?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                      title={t.cta.cta}
                      width="100%"
                      height="216"
                      className="block w-full border-0"
                      frameBorder="0"
                      marginHeight={0}
                      marginWidth={0}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={loadEmbeds}
      />
    </section>
  );
}
