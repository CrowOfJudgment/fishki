"use client";

import { useT } from "@/lib/i18n-context";

const cards = [
  {
    key: "value",
    tone: "from-blue-500/18 to-cyan-400/10",
  },
  {
    key: "problem",
    tone: "from-emerald-500/16 to-teal-400/10",
  },
  {
    key: "how",
    tone: "from-amber-400/18 to-orange-400/10",
  },
  {
    key: "simulation",
    tone: "from-violet-500/18 to-fuchsia-400/10",
  },
  {
    key: "why",
    tone: "from-rose-500/16 to-pink-400/10",
  },
  {
    key: "built",
    tone: "from-slate-200/18 to-white/8",
  },
] as const;

export default function Features() {
  const t = useT();

  return (
    <section
      id="features"
      className="relative isolate overflow-hidden scroll-mt-28 bg-slate-950 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_22%)]"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200/90">
            {t.features.badge}
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-balance text-white sm:text-4xl lg:text-5xl">
            {t.features.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl leading-8 text-slate-300 xl:text-[22px] xl:leading-9">
            {t.features.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:gap-6 lg:grid-cols-3">
          {cards.map((card, index) => {
            const data = t.features[card.key as keyof typeof t.features] as {
              heading: string;
              text: string;
            };

            return (
              <article
                key={card.key}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(2,6,23,0.24)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-br ${card.tone} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-white ring-1 ring-white/10">
                      0{index + 1}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-white">
                    {data.heading}
                  </h3>
                  <p className="mt-4 text-[15px] leading-7 text-slate-300 sm:text-base sm:leading-8 xl:text-[17px]">
                    {data.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-white/10 bg-white/[0.04] px-6 py-5 text-center text-xl leading-6 text-slate-300 backdrop-blur-sm">
          {t.features.footerNote}
        </div>
      </div>
    </section>
  );
}
