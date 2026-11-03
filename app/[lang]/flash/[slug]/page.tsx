import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { formatDate, getStory, getStorySlugs } from "@/app/lib/stories";
import { getDictionary, getLocale, hasLocale } from "../../dictionaries";

// Prebuild every story that exists in this language
export async function generateStaticParams({
  params,
}: {
  params: { lang: string };
}) {
  if (!hasLocale(params.lang)) return [];
  const locale = params.lang;
  return getStorySlugs()
    .filter((slug) => getStory(slug, locale))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/flash/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug, await getLocale());
  return story ? { title: story.title, description: story.excerpt } : {};
}

export default async function StoryPage({
  params,
}: PageProps<"/[lang]/flash/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const story = getStory(slug, locale);
  if (!story) notFound();

  const dict = await getDictionary();

  return (
    <main className="mx-auto w-full max-w-prose px-6 py-16">
      <Link
        href={`/${locale}`}
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        {dict.story.back}
      </Link>

      <div className="mt-8 mb-10 border-b border-line pb-6">
        <h1 className="text-4xl font-bold">{story.title}</h1>
        <time
          dateTime={story.date.toISOString()}
          className="mt-2 block text-sm text-muted"
        >
          {formatDate(story.date, locale)}
        </time>
      </div>

      {/* Drop cap: the first letter of the story, like in a printed book */}
      <article className="text-lg leading-relaxed [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-2 [&>p:first-child]:first-letter:text-6xl [&>p:first-child]:first-letter:leading-none [&>p:first-child]:first-letter:font-bold [&>p:first-child]:first-letter:text-accent">
        <Markdown
          components={{
            p: ({ children }) => <p className="mb-5">{children}</p>,
            hr: () => (
              <p className="my-10 text-center tracking-[1em] text-accent/60">
                ***
              </p>
            ),
          }}
        >
          {story.content}
        </Markdown>
      </article>
    </main>
  );
}
