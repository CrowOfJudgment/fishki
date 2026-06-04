"use client";

import Link from "next/link";
import Logo from "./logo";
import { useT } from "@/lib/i18n-context";

export default function Footer({ border = false }: { border?: boolean }) {
  const t = useT();
  const year = new Date().getFullYear();

  const productLinks = [
    { href: "#features", label: t.footer.features },
    { href: "#preview", label: t.footer.preview },
    { href: "#proof", label: t.footer.proof },
  ];

  return (
    <footer
      className={`relative pb-10 pt-16 sm:pt-20 ${
        border ? "border-t border-slate-200/80" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-white/75 px-5 py-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-8 sm:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr]">
            <div className="max-w-md">
              <Logo />
              <p className="mt-5 text-sm leading-7 text-slate-600">
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                {t.footer.product}
              </p>
              <ul className="mt-5 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition group-hover:bg-slate-700" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:block">
              <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {t.footer.social}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["LinkedIn", "FB", "IG", "TIKTOK"].map((label) => (
                    <span
                      key={label}
                      className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                {/* <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {t.footer.legal}
                </p> */}
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  © 2026 Fishki. Built with care for junior developers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
