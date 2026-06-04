"use client";

import Link from "next/link";
import Logo from "./logo";
import { useT } from "@/lib/i18n-context";

export default function Header() {
  const t = useT();

  const navLinks = [
    { href: "#preview", label: t.header.preview },
    { href: "#features", label: t.header.features },
    { href: "#proof", label: t.header.proof },
  ];

  return (
    <header className="fixed inset-x-0 top-3 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 rounded-[1.4rem] border border-white/55 bg-white/70 px-4 py-3 shadow-[0_16px_50px_rgba(15,23,42,0.09)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Logo />
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
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {t.header.cta}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
