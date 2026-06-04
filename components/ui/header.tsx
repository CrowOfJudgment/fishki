"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./logo";
import { useT } from "@/lib/i18n-context";

export default function Header() {
  const t = useT();
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateVisibility = () => {
      const mobile = window.matchMedia("(max-width: 639px)").matches;
      const currentScrollY = window.scrollY;

      setIsMobile(mobile);

      if (!mobile) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY < 12) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 24) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (isMobile && !isVisible) {
    return null;
  }

  const navLinks = [
    { href: "#preview", label: t.header.preview },
    { href: "#features", label: t.header.features },
    { href: "#proof", label: t.header.proof },
  ];

  return (
    <header className="fixed inset-x-0 top-2 z-40 sm:top-3">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2 rounded-[1.25rem] border border-white/55 bg-white/72 px-3 py-2.5 shadow-[0_16px_50px_rgba(15,23,42,0.09)] backdrop-blur-xl sm:gap-3 sm:rounded-[1.4rem] sm:px-4 sm:py-3">
          <div className="flex items-center gap-3">
            <Logo horizontal className="w-[92px] sm:w-[118px] lg:w-[138px]" />
            <span className="hidden rounded-full border border-blue-500/15 bg-blue-500/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-700 md:inline-flex">
              {t.hero.badge}
            </span>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-900/5 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="#cta"
              aria-label={t.header.ctaAria ?? t.header.cta}
              className="inline-flex h-9 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-medium text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {t.header.cta}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
