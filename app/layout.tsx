import "./css/style.css";
import { cookies, headers } from "next/headers";
import { I18nProvider } from "@/lib/i18n-context";

export const metadata = {
  title: "Fishki",
  description: "Land your next job",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieLocale = cookieStore.get("locale")?.value;
  const acceptLanguage = headerStore.get("accept-language")?.toLowerCase() ?? "";
  const locale =
    cookieLocale === "pl" || acceptLanguage.startsWith("pl") ? "pl" : "en";

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="bg-gray-50 font-inter tracking-tight text-gray-900 antialiased">
        <I18nProvider locale={locale}>
          <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
