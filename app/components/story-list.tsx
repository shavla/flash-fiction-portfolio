import Link from "next/link";
import type { Locale } from "@/app/[lang]/dictionaries";
import { formatDate, type Story } from "@/app/lib/stories";

export default function StoryList({ stories, locale }: { stories: Story[]; locale: Locale }) {
  return (
    <ul className="flex flex-col gap-4">
      {stories.map((story) => (
        <li key={story.slug}>
          <Link
            href={`/${locale}/flash/${story.slug}`}
            className="group block rounded-lg border border-line border-l-4 border-l-accent/40 bg-card p-5 shadow-sm transition hover:border-l-accent hover:shadow-md"
          >
            <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
              {story.title}
            </h3>
            <time
              dateTime={story.date.toISOString()}
              className="text-sm text-muted"
            >
              hehe
              {formatDate(story.date, locale)}
            </time>
            <p className="mt-2 italic text-foreground/80">{story.excerpt}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
