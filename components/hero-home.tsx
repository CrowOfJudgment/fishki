"use client";

import { useT } from "@/lib/i18n-context";

export default function HeroHome() {
  const t = useT();

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-0 md:pb-2 md:pt-20">
          {/* Section header */}
          <div className="pb-4 text-center md:pb-16">

            {/* subtle divider */}
            <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" />

            {/* MAIN TITLE */}
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              {t.hero.title}
              <br className="max-lg:hidden" />
            </h1>

            {/* SUBTITLE */}
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-3xl text-gray-700">
                {t.hero.subtitle}
              </p>

              <p className="mt-4 text-xl text-gray-400">
                {t.hero.earlyAcces}
              </p>
            </div>

          </div>

          {/* Hero image placeholder */}
        </div>
      </div>
    </section>
  );
}