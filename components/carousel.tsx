"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n-context";

function PhoneMockup({
  src,
  alt,
  scale = 1,
}: {
  src: string;
  alt: string;
  scale?: number;
}) {
  return (
    <div className="relative w-[220px] max-w-full rounded-[34px] bg-gradient-to-b from-slate-900 via-black to-slate-900 p-[5px] shadow-[0_30px_90px_rgba(15,23,42,0.45)] sm:w-[280px] sm:rounded-[42px] sm:p-1.5">
      <div className="absolute inset-x-10 top-3 h-8 rounded-full bg-white/10 blur-xl" />
      <div className="absolute left-1/2 top-2 h-1.5 w-24 -translate-x-1/2 rounded-full bg-white/20" />
      <div className="relative flex h-[440px] items-center justify-center overflow-hidden rounded-[30px] bg-white ring-1 ring-white/10 sm:h-[560px] sm:rounded-[38px]">
        <img
          alt={alt}
          src={src}
          className="h-full w-full object-contain"
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}

function Chevron({
  direction,
}: {
  direction: "left" | "right";
}) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d={direction === "left" ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Carousel() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const t = useT();

  const slides = [
    {
      src: "/images/flashcards.png",
      title: t.carousel.flashcards.title,
      desc: t.carousel.flashcards.desc,
      scale: 0.95,
    },
    {
      src: "/images/main-screen.png",
      title: t.carousel.mainScreen.title,
      desc: t.carousel.mainScreen.desc,
      scale: 0.9,
    },
    {
      src: "/images/splash-screen.png",
      title: t.carousel.splashScreen.title,
      desc: t.carousel.splashScreen.desc,
      scale: 1,
    },
  ];

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoplay = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  const goToSlide = (nextIndex: number) => {
    const next = (nextIndex + slides.length) % slides.length;
    setActive(next);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  return (
    <div className="w-full">
      <div
        className="mx-auto max-w-6xl px-4 pb-5 sm:px-6"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        onTouchStart={stopAutoplay}
        onTouchEnd={startAutoplay}
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_38%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.88))]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent" />

          <div className="relative px-4 py-6 sm:px-8 sm:py-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  {slides[active].title}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => goToSlide(active - 1)}
                  aria-label="Previous slide"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <Chevron direction="left" />
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(active + 1)}
                  aria-label="Next slide"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <Chevron direction="right" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent" />

              <div className="overflow-hidden">
                <div
                  className="flex will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: `translate3d(-${active * 100}%, 0, 0)`,
                  }}
                >
                  {slides.map((slide, index) => (
                    <div key={slide.src} className="min-w-full px-2 py-4 sm:px-6">
                      <div
                        className={`flex justify-center transition-all duration-700 ${
                          index === active
                            ? "scale-100 opacity-100"
                            : "scale-[0.96] opacity-70"
                        }`}
                      >
                        <PhoneMockup
                          src={slide.src}
                          alt={slide.title}
                          scale={slide.scale}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === active
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <div className="max-w-xl rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center backdrop-blur">
                <p className="text-lg font-semibold text-white">
                  {slides[active].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
