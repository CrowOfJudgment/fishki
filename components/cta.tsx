"use client";

import { useT } from "@/lib/i18n-context";

export default function Cta() {
  const t = useT();

  return (
    <section className="mt-5" id="cta">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <div
          className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gray-900"
        >
          {/* Glow */}
          <div
            className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
          >
            <div className="h-56 w-[480px] rounded-full border-[20px] border-blue-500 blur-3xl" />
          </div>

          {/* Content */}
          <div className="px-4 py-12 md:px-12 md:py-20">
            
            <h2 className="mb-10 text-3xl font-bold text-gray-200 md:text-4xl">
              {t.cta.cta}
            </h2>

            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <div className="relative z-20 w-full">
                <iframe
                  src="https://tally.so/embed/ODkPZk?hideTitle=1&transparentBackground=1"
                  width="100%"
                  height="220"
                  className="w-full"
                  frameBorder="0"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}