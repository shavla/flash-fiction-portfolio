import { lang } from "next/root-params";
import { notFound } from "next/navigation";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ka: () => import("./dictionaries/ka.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const locales = Object.keys(dictionaries) as Locale[];

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getLocale = async () => {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
};

export const getDictionary = async () => dictionaries[await getLocale()]();
