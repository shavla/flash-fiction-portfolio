import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/app/[lang]/dictionaries";

const storiesDir = path.join(process.cwd(), "content", "stories");

export type Story = {
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
  content: string;
};

// Every folder in content/stories is a story; its name is the URL slug
export function getStorySlugs() {
  return fs
    .readdirSync(storiesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

// Returns null if the story doesn't exist or isn't written in this language yet
export function getStory(slug: string, locale: Locale): Story | null {
  if (!getStorySlugs().includes(slug)) return null;

  const file = path.join(storiesDir, slug, `${locale}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  return {
    slug,
    title: data.title,
    date: new Date(data.date),
    excerpt: data.excerpt ?? "",
    content,
  };
}

// Newest first
export function getStories(locale: Locale) {
  return getStorySlugs()
    .map((slug) => getStory(slug, locale))
    .filter((story) => story !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ka" ? "ka-GE" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}
