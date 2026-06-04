"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n-context";

function PhoneMockup({
  src,
  scale = 1,
}: {
  src: string;
  scale?: number;
}) {
  return (
    <div className="w-[280px] h-[560px] rounded-[42px] bg-black p-1 shadow-2xl">
      <div className="w-full h-full rounded-[38px] overflow-hidden bg-white flex items-center justify-center">
        <img
          src={src}
          className="object-contain"
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}

export default function Carousel() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
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
  },
];

  const startAutoplay = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % slides.length;

        containerRef.current?.scrollTo({
          left: next * (containerRef.current?.clientWidth || 0),
          behavior: "smooth",
        });

        return next;
      });
    }, 4000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  return (
    <div className="w-full">
      {/* SCROLL ROW */}
      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-6"
        onScroll={(e) => {
          const el = e.currentTarget;
          const index = Math.round(el.scrollLeft / el.clientWidth);
          setActive(index);
        }}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        onTouchStart={stopAutoplay}
        onTouchEnd={startAutoplay}
      >
        {slides.map((s, i) => (
          <div key={i} className="min-w-full flex justify-center snap-center">
            <PhoneMockup src={s.src} scale={s.scale} />
          </div>
        ))}
      </div>

      {/* TEXT BELOW */}
      <div className="text-center mt-6 mb-11 max-w-xl mx-auto">
        <h3 className="text-xl font-semibold">{slides[active].title}</h3>
        <p className="text-gray-500 mt-2">{slides[active].desc}</p>
      </div>
    </div>
  );
}