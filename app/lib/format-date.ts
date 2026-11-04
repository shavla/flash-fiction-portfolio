import { intlLocales, type Locale } from "./i18n";

export function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(intlLocales[locale], {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}
