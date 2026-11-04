export const locales = ["en", "ka"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const intlLocales: Record<Locale, string> = {
  en: "en-GB",
  ka: "ka-GE",
};
