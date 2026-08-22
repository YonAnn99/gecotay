import esMessages from "../messages/es.json";
import enMessages from "../messages/en.json";

type Messages = typeof esMessages;

const messages: Record<string, Messages> = {
  es: esMessages,
  en: enMessages,
};

export function getMessages(locale: string): Messages {
  return messages[locale] || messages.es;
}

export function t(locale: string, key: string): string {
  const msgs = getMessages(locale);
  const keys = key.split(".");
  let value: unknown = msgs;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // fallback
    }
  }
  return typeof value === "string" ? value : key;
}