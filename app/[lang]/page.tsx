import Image from "next/image";
import StoryList from "@/app/components/story-list";
import { getStories } from "@/app/lib/stories";
import { getDictionary, getLocale } from "./dictionaries";

export default async function Home() {
  const dict = await getDictionary();
  const locale = await getLocale();

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Image
          src="/images/profile.png"
          alt={dict.home.photoAlt}
          width={112}
          height={112}
          loading="eager"
          className="size-30 rounded-full object-cover object-top-right ring-2 ring-accent/40 ring-offset-4 ring-offset-background"
        />
        <div>
          <h1 className="mb-2 text-4xl font-bold">
            {dict.metadata.title}
          </h1>
          <p className="text-muted">{dict.metadata.description}</p>
        </div>
      </div>

      <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
        {dict.flash.title}
      </h2>
      <StoryList stories={getStories(locale)} locale={locale} />
    </main>
  );
}
