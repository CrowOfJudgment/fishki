"use client";

import { useT } from "@/lib/i18n-context";

export default function SocialProof() {
  const t = useT();

  return (
    <section
      id="proof"
      className="relative scroll-mt-28 pb-10 pt-16 sm:pb-12 sm:pt-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-10">
            <span className="inline-flex rounded-full border border-blue-500/15 bg-blue-500/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
              {t.proof.badge}
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-balance text-slate-950 sm:text-4xl">
              {t.proof.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {t.proof.subtitle}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {t.proof.stats.map((stat: { value: string; label: string }) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-5 text-center shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
                >
                  <div className="font-display text-3xl font-semibold text-slate-950">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_24px_70px_rgba(2,6,23,0.28)] sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 top-10 h-48 w-48 rounded-full bg-blue-500/18 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-12 right-0 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
            />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-200/70">
                  {t.proof.author}
                </p>
                <p className="mt-6 font-display text-2xl leading-relaxed text-balance sm:text-3xl">
                  {t.proof.quote}
                </p>
              </div>

              <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <div>
                  <div className="text-sm font-semibold text-white">
                    {t.proof.author}
                  </div>
                  <div className="text-sm text-slate-300">{t.proof.role}</div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                  Premium
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
