"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
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
    <div className="relative w-[240px] max-w-full rounded-[36px] bg-gradient-to-b from-slate-900 via-black to-slate-900 p-[5px] shadow-[0_30px_90px_rgba(15,23,42,0.45)] sm:w-[300px] sm:rounded-[44px] sm:p-1.5 lg:w-[340px] xl:w-[380px]">
      <div className="absolute inset-x-10 top-3 h-8 rounded-full bg-white/10 blur-xl" />
      <div className="absolute left-1/2 top-2 h-1.5 w-24 -translate-x-1/2 rounded-full bg-white/20" />
      <div className="relative flex h-[480px] items-center justify-center overflow-hidden rounded-[32px] bg-white ring-1 ring-white/10 sm:h-[600px] sm:rounded-[40px] lg:h-[680px] xl:h-[760px]">
        <Image
          alt={alt}
          src={src}
          fill
          sizes="(min-width: 1280px) 380px, (min-width: 1024px) 340px, (min-width: 640px) 300px, 240px"
          className="object-contain"
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

const slideAssets = [
  { src: "/images/carousel-01-splash-screen.png", scale: 1 },
  { src: "/images/carousel-02-career-path.png", scale: 1 },
  { src: "/images/carousel-03-progress-control.png", scale: 1 },
  { src: "/images/carousel-04-real-interview-questions.png", scale: 1 },
  { src: "/images/carousel-05-think-like-interviewer.JPEG", scale: 1 },
  { src: "/images/carousel-06-data-engineering-fundamentals.JPEG", scale: 1 },
  { src: "/images/carousel-07-data-driven-decisions.JPEG", scale: 1 },
  { src: "/images/carousel-08-understand-not-memorize.JPEG", scale: 1 },
  { src: "/images/carousel-09-knowledge-in-practice.png", scale: 1 },
  { src: "/images/carousel-10-job-posting-study-plan.png", scale: 1 },
  { src: "/images/carousel-11-practice-answers-out-loud.png", scale: 1 },
  { src: "/images/carousel-12-daily-learning-habit.png", scale: 1 },
] as const;

export default function Carousel() {
  const [active, setActive] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const t = useT();

  const slides = slideAssets.map((asset, index) => {
    const text = t.carousel.slides?.[index] ?? { title: "", desc: "" };

    return {
      ...asset,
      title: text.title,
      desc: text.desc,
    };
  });

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setActive((prev: number) => (prev + 1) % slideAssets.length);
    }, 4000);
  }, []);

  const goToSlide = useCallback((nextIndex: number) => {
    const next = (nextIndex + slideAssets.length) % slideAssets.length;
    setActive(next);
  }, []);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    stopAutoplay();
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX ?? null;

    if (startX !== null && endX !== null) {
      const deltaX = startX - endX;

      if (Math.abs(deltaX) > 48) {
        goToSlide(deltaX > 0 ? active + 1 : active - 1);
      }
    }

    touchStartX.current = null;
    startAutoplay();
  };

  const handleTouchCancel = () => {
    touchStartX.current = null;
    startAutoplay();
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  return (
    <section id="preview" className="w-full scroll-mt-28">
      <div
        className="mx-auto max-w-6xl px-4 pb-5 sm:px-6"
        style={{ touchAction: "pan-y" }}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_38%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.88))]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent" />

          <div className="relative px-4 py-6 sm:px-8 sm:py-8 lg:py-9">
            <div className="mb-6 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">
                  {t.header.preview}
                </span>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-white lg:text-3xl">
                  {slides[active].title}
                </h3>
              </div>

              <div className="flex shrink-0 items-center gap-2">
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
                    <div key={slide.src} className="min-w-full px-2 py-2 sm:px-6">
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
                <p className="text-lg font-semibold leading-7 text-white sm:text-xl">
                  {slides[active].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
