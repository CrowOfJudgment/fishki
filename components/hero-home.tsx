"use client";

import { useT } from "@/lib/i18n-context";

export default function HeroHome() {
  const t = useT();

  return (
    <section id="top" className="relative overflow-hidden scroll-mt-28 py-10 sm:py-16 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(14,165,233,0.1),transparent_26%),radial-gradient(circle_at_50%_110%,rgba(15,23,42,0.08),transparent_38%)]"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative">
            <span className="inline-flex rounded-full border border-blue-500/15 bg-blue-500/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
              {t.hero.badge}
            </span>

            <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance text-slate-950 sm:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              {t.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#waitlist-form"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {t.hero.primaryCta}
              </a>
              <a
                href="#preview"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/75 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
              >
                {t.hero.secondaryCta}
              </a>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
              {t.hero.earlyAcces}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {t.hero.highlights.map((item: string) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-10 rounded-[2.5rem] bg-blue-500/10 blur-3xl motion-safe:animate-float"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    {t.hero.cardLabel}
                  </p>
                  <h2 className="mt-2 max-w-lg font-display text-2xl font-semibold leading-tight text-slate-950">
                    {t.hero.cardTitle}
                  </h2>
                </div>
                {/* <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                  Live
                </span> */}
              </div>

              <div className="mt-6 space-y-3">
                {t.hero.cards.map((item: { title: string; text: string }, index: number) => (
                  <div
                    key={item.title}
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)]"
                  >
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 to-slate-700 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(15,23,42,0.16)]">
                      0{index + 1}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {t.hero.stats.map((stat: { value: string; label: string }) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4 text-center"
                  >
                    <div className="font-display text-2xl font-semibold text-slate-950">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
