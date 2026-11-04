import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/app/lib/i18n";
import type en from "./dictionaries/en.json";

// English is the reference: every other language must have the same keys
type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ka: () => import("./dictionaries/ka.json").then((module) => module.default),
};

export const getLocale = async () => {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
};

export const getDictionary = async () => dictionaries[await getLocale()]();
