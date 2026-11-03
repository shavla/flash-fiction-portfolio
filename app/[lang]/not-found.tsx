import { getDictionary } from "./dictionaries";

export default async function NotFoundPage() {
    const dict = await getDictionary();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
            <span className="text-6xl font-bold text-accent">404</span>
            <p className="text-muted">{dict.notFound}</p>
        </div>
    )
}
