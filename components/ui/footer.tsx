"use client";

import Link from "next/link";
import Logo from "./logo";
import { useT } from "@/lib/i18n-context";

export default function Footer({ border = false }: { border?: boolean }) {
  const t = useT();

  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* TOP AREA */}
        <div
          className={`flex flex-col items-center gap-10 py-8 md:flex-row md:justify-center md:gap-20 md:py-12 ${
            border
              ? "border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]"
              : ""
          }`}
        >
          {/* Logo */}
          <div className="flex flex-col items-center text-center md:items-center">
            <Logo />
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center text-center">
            <div className="text-sm text-gray-600">
              &copy; Fishki
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-sm font-medium mb-2">
              {t.footer.social}
            </h3>

            <ul className="flex gap-2 justify-center">
              <li>
                <Link
                  className="flex items-center justify-center text-blue-500 transition hover:text-blue-600"
                  href="#0"
                  aria-label="Twitter"
                >
                  <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
                    <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Z" />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  className="flex items-center justify-center text-blue-500 transition hover:text-blue-600"
                  href="#0"
                  aria-label="Medium"
                >
                  <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
                    <path d="M23 8H9a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Z" />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  className="flex items-center justify-center text-blue-500 transition hover:text-blue-600"
                  href="#0"
                  aria-label="Github"
                >
                  <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
                    <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8Z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BIG TEXT BACKGROUND */}
      <section className="relative pb-24 sm:pb-32 overflow-hidden">
        <div className="mt-10 flex justify-center" aria-hidden="true">
          <div className="text-center font-bold leading-none text-gray-200/40 select-none pointer-events-none">
            <div className="text-[80px] sm:text-[140px] md:text-[220px] lg:text-[300px] leading-none">
              Fishki
            </div>
          </div>

          {/* Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div className="h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-full border-[20px] border-blue-700 blur-[80px]" />
          </div>
        </div>
      </section>
    </footer>
  );
}