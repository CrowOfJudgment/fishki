"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n-context";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = useT();

  return (
    <a
      href="#waitlist-form"
      className={`
        fixed bottom-4 left-4 right-4 z-50 mx-auto flex w-fit items-center gap-3 rounded-full border border-[#FFECA0] bg-[#FFD84D] px-5 py-3.5 text-[15px] font-semibold uppercase tracking-[0.08em] text-slate-950 shadow-[0_18px_50px_rgba(255,216,77,0.32)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFE680] sm:bottom-6 sm:left-auto sm:right-6 sm:mx-0 sm:text-base
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-slate-950 shadow-[0_0_0_6px_rgba(15,23,42,0.12)]" />
      <span>{t.floatingCta.text}</span>
      <span className="text-slate-500">→</span>
    </a>
  );
}
