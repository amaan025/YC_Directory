import SearchForm from "@/components/SearchForm";
import { SanityLive } from "@/sanity/lib/live";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";
import StartupsList from "@/components/StartupList";

export default async function HomeInner({
                                            searchParams,
                                        }: {
    searchParams: Promise<{ query?: string }>;
}) {
    const { query } = await searchParams;

    return (
        <>
            <section className="pink_container pattern">
                <h1 className="heading">
                    Pitch Your Startup, <br /> Connect With Entrepreneurs
                </h1>
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
                </p>
                <SearchForm query={query} />
            </section>

            <section className="section-container">
                <p className="text-30-semibold">
                    {query ? `Search results for ${query}` : "All Startups"}
                </p>

                <ul className="mt-7 card_grid">
                    <Suspense fallback={<StartupCardSkeleton />}>
                        <StartupsList query={query} />
                    </Suspense>
                </ul>
            </section>

            <SanityLive />
        </>
    );
}
