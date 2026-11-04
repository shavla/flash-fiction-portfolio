import Image from "next/image";
import StoryList from "@/app/components/story-list";
import { getStories } from "@/app/lib/stories";
import { getDictionary, getLocale } from "./dictionaries";

export default async function Home() {
  const dict = await getDictionary();
  const locale = await getLocale();

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <div className="flex flex-col items-center gap-6 sm:h-35 sm:items-start sm:flex-row">
        <Image
          src="/images/profile.png"
          alt={dict.home.photoAlt}
          width={120}
          height={120}
          loading="eager"
          className="size-30 shrink-0 rounded-full object-cover object-top-right ring-2 ring-accent/40 ring-offset-4 ring-offset-background"
        />
        <div className="min-w-0">
          <h1 className="text-4xl font-bold text-center sm:text-left">
            {dict.home.title}
          </h1>
          <p className="text-muted text-sm text-center sm:text-left mt-4">{dict.home.quote}</p>
        </div>
      </div>

      <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
        {dict.home.subTitle}
      </h2>
      <StoryList stories={getStories(locale)} locale={locale} />
    </main>
  );
}
