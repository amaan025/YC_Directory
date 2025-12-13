import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { unstable_noStore as noStore } from "next/cache";

export default async function StartupsList({ query }: { query?: string }) {
    noStore(); // ✅ dynamic hole

    const params = { search: query || null };

    const posts = await client
        .withConfig({ useCdn: false }) // ✅ bypass Sanity CDN so views are fresh
        .fetch(STARTUP_QUERY, params);

    return (
        <>
            {posts?.length > 0 ? (
                posts.map((post: StartupCardType) => (
                    <StartupCard key={post._id} posts={post} />
                ))
            ) : (
                <p className="no-results">No startups found</p>
            )}
        </>
    );
}
