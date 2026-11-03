import { notFound } from "next/navigation";

// Unknown URLs like /en/whatever render the localized [lang]/not-found.tsx
export default function CatchAll() {
    notFound();
}
