// components/View.tsx
import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";

export default async function View({
                                       params,
                                   }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const data = await client
        .withConfig({ useCdn: false })
        .fetch(STARTUP_VIEWS_QUERY, { id });

    const totalViews = data?.views ?? 0;

    after(async () => {
        await writeClient
            .patch(id)
            .setIfMissing({ views: 0 })
            .set({ views: totalViews + 1 })
            .commit();
    });

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <p className="view-text">
                <span className="font-black">Views: {totalViews}</span>
            </p>
        </div>
    );
}
