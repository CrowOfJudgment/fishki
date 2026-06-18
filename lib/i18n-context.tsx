"use client";

import { createContext, useContext } from "react";
import { getMessages, type Locale, type Messages } from "./i18n";

type I18nValue = {
  locale: Locale;
  t: Messages;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getMessages(locale);

  return (
    <I18nContext.Provider value={{ locale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}

export function useT() {
  return useI18n().t;
}

export function useLocale() {
  return useI18n().locale;
}
