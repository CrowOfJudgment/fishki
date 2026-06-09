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
        fixed bottom-4 left-4 right-4 z-50 mx-auto flex w-fit items-center gap-3 rounded-full border border-white/40 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:bottom-6 sm:left-auto sm:right-6 sm:mx-0
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.14)]" />
      <span>{t.floatingCta.text}</span>
      <span className="text-slate-500">→</span>
    </a>
  );
}
