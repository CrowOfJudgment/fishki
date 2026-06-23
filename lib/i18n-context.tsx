"use client";

import { createContext, useContext } from "react";
import { getMessages, Locale, type Messages } from "./i18n";

type I18nValue = {
  locale: Locale;
  messages: Messages;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const messages = getMessages(locale);

  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useT must be used within I18nProvider");
  }

  return context.messages;
}

export function useLocale() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useLocale must be used within I18nProvider");
  }

  return context.locale;
}
