import { STARTUP_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { unstable_noStore as noStore } from "next/cache";

export default async function UserStartups({ id }: { id: string }) {
    noStore(); // ✅ dynamic hole

    const startups = await client
        .withConfig({ useCdn: false }) // ✅ freshest views
        .fetch(STARTUP_BY_AUTHOR_QUERY, { id });

    return (
        <>
            {startups?.length > 0 ? (
                startups.map((startup: StartupCardType) => (
                    <StartupCard key={startup._id} posts={startup} />
                ))
            ) : (
                <p className="no-result">No posts yet</p>
            )}
        </>
    );
}
