import "./css/style.css";
import { headers } from "next/headers";
import { I18nProvider } from "@/lib/i18n-context";

export const metadata = {
  title: "Fishki",
  description: "Premium interview prep for junior developers",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerStore = await headers();

  const acceptLanguage = headerStore.get("accept-language")?.toLowerCase() ?? "";
  const locale = acceptLanguage.startsWith("pl") ? "pl" : "en";

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="relative overflow-x-hidden bg-[#f6f2ea] font-inter tracking-tight text-slate-900 antialiased selection:bg-blue-500/15 selection:text-slate-900">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-30 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_24%),linear-gradient(180deg,#faf7f1_0%,#f4efe6_55%,#eef2f9_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-20 opacity-[0.07] mix-blend-multiply [background-image:radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.3)_1px,transparent_0)] [background-size:30px_30px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-[-8rem] top-28 -z-20 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl motion-safe:animate-float"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed right-[-8rem] top-[30rem] -z-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl motion-safe:animate-float"
        />
        <I18nProvider locale={locale}>
          <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
