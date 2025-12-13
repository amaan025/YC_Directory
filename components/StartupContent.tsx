// components/StartupContent.tsx
import { client } from "@/sanity/lib/client";
import {PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import StartupCard, {StartupCardType} from "@/components/StartupCard";

const md = markdownit();

export default async function StartupContent({
                                                 params,
                                             }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const [posts, {select: editorPosts}]= await Promise.all([
        client.fetch(
            STARTUP_BY_ID_QUERY,
            { id }),

        client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: 'editor-picks'})


    ])

    if (!posts) return notFound();

    const parsedContent = md.render(posts?.pitch || "");

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(posts?._createdAt)}</p>

                <h1 className="heading">{posts.title}</h1>
                <p className="sub-heading !max-w-5xl">{posts.description}</p>
            </section>

            <section className="section_container">
                <img
                    src={posts.image}
                    alt="thumbnail"
                    className="w-full h-auto rounded-xl"
                />

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link
                            href={`/user/${posts.author?._id}`}
                            className="flex gap-2 items-center mb-3"
                        >
                            <Image
                                src={posts.author.image}
                                alt="avatar"
                                width={64}
                                height={64}
                                className="rounded-full drop-shadow-lg"
                            />

                            <div>
                                <p className="text-20-medium">{posts.author.name}</p>
                                <p className="text-16-medium !text-black-300">
                                    @{posts.author.username}
                                </p>
                            </div>
                        </Link>

                        <p className="category-tag">{posts.category}</p>
                    </div>

                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedContent ? (
                        <article
                            className="prose max-w-4xl font-work-sans break-all"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    ) : (
                        <p className="no-result">No details provided</p>
                    )}
                </div>

                <hr className="divider" />

                {editorPosts?.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <p className="text-30-semibold">Editor Picks</p>

                        <ul className="mt-7 card_grid-sm">
                            {editorPosts.map((posts: StartupCardType, i: number) => (
                                <StartupCard key={i} posts={posts} />
                            ))}
                        </ul>
                    </div>
                )}

            </section>
        </>
    );
}
