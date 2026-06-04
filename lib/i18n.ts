import en from "@/messages/en.json";
import pl from "@/messages/pl.json";

export const locales = ["en", "pl"] as const;

export type Locale = (typeof locales)[number];
export type Messages = typeof en;

export const messages = {
  en,
  pl,
} satisfies Record<Locale, Messages>;

export function getMessages(locale: Locale) {
  return messages[locale] ?? messages.en;
}
