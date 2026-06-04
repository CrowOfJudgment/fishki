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
      href="#cta"
      className={`
        fixed bottom-6 right-6 z-50
        rounded-full px-5 py-3
        bg-black text-white text-sm font-medium
        shadow-lg
        transition-all duration-300
        hover:scale-105 hover:shadow-xl
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      {t.floatingCta.text} →
    </a>
  );
}