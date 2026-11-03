"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Flag from "@/app/components/ui/flag";

const languages = [
  { code: "en", label: "EN", flag: "/images/lang/united-kingdom.png" },
  { code: "ka", label: "KA", flag: "/images/lang/georgia.png" },
];

export default function LanguageSwitcher({ current }: { current: string }) {
  const pathname = usePathname();
  // Hover opens the menu on desktop; tapping toggles it on touch screens
  const [open, setOpen] = useState(false);

  const active = languages.find((l) => l.code === current) ?? languages[0];
  const others = languages.filter((l) => l.code !== active.code);

  // Swap the first path segment: /en/flash -> /ka/flash
  const hrefFor = (code: string) => {
    const segments = pathname.split("/");
    segments[1] = code;
    return segments.join("/");
  };

  return (
    <div className="group relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 rounded border border-line bg-card px-3 py-1 shadow-sm hover:border-accent/50"
      >
        <Flag src={active.flag} label={active.label} />
      </button>

      <div
        className={`absolute right-0 top-full pt-1 ${
          open ? "block" : "hidden group-hover:block group-focus-within:block"
        }`}
      >
        <div className="overflow-hidden rounded border border-line bg-card shadow-md">
          {others.map(({ code, label, flag }) => (
            <Link
              key={code}
              href={hrefFor(code)}
              onClick={() => {
                document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1 hover:bg-accent/10"
            >
              <Flag src={flag} label={label} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
