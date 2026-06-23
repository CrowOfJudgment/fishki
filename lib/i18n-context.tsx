"use client";

import { createContext, useContext } from "react";
import { getMessages, Locale, type Messages } from "./i18n";

const I18nContext = createContext<Messages | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getMessages(locale);

  return (
    <I18nContext.Provider value={t}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT() {
  const messages = useContext(I18nContext);

  if (!messages) {
    throw new Error("useT must be used within I18nProvider");
  }

  return messages;
}
