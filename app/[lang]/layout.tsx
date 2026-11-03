import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { lang } from "next/root-params";
import "../globals.css";
import { getDictionary, locales } from "./dictionaries";
import LanguageSwitcher from "@/app/components/language-switcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await lang();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="fixed top-4 right-4 z-50">
          <LanguageSwitcher current={locale} />
        </div>
        {children}
      </body>
    </html>
  );
}
