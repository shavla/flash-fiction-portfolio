import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Story } from "@/app/types/story";
import type { Locale } from "./i18n";

const STORIES_DIR = path.join(process.cwd(), "content", "stories");

// Every folder in content/stories is a story; its name is the URL slug
export function getStorySlugs(): string[] {
  return fs
    .readdirSync(STORIES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

// Returns null if the story doesn't exist or isn't written in this language yet
export function getStory(slug: string, locale: Locale): Story | null {
  // Only accept real folder names, so a URL can't reach files outside content/stories
  if (!getStorySlugs().includes(slug)) return null;
  return readStory(slug, locale);
}

// All stories written in this language, newest first
export function getStories(locale: Locale): Story[] {
  return getStorySlugs()
    .map((slug) => readStory(slug, locale))
    .filter((story) => story !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

function readStory(slug: string, locale: Locale): Story | null {
  const file = path.join(STORIES_DIR, slug, `${locale}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf-8"));

  // Fail loudly on a broken --- block instead of showing a blank title or "Invalid Date"
  const where = `content/stories/${slug}/${locale}.md`;
  if (typeof data.title !== "string") {
    throw new Error(`${where}: "title" is missing`);
  }
  const date = new Date(data.date);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${where}: "date" is missing or not a date (use YYYY-MM-DD)`);
  }

  return {
    slug,
    title: data.title,
    date,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    content,
  };
}
