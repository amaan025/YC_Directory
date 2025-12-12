import React, {Suspense} from 'react'
import {STARTUP_BY_ID_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from 'markdown-it'
import {Skeleton} from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit()


const Page = async ({params}:{params: Promise<{id: string}>}) => {


    const id = (await params).id

    const posts = await client.fetch(STARTUP_BY_ID_QUERY, {id})

    if(!posts) return notFound();

    const parsedContent = md.render(posts?.pitch || '');

    return (
        <>
            <section className="pink_container pattern !min-h-[230px]">
                <p className="tag">{formatDate(posts?._creatdAt)}</p>
                <h1 className="heading">{posts.title}</h1>
                <p className="sub-heading !max-w-5xl">{posts.description}</p>
            </section>

            <section className="section_container">
                <img src={posts.image} alt="thubnail" className="w-full h-auto rounded-xl"/>
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${posts.author?._id}`} className="flex gap-2 items-center mb-3">
                            <Image src={posts.author.image} alt="author" width={64} height={64} className="rounded-full drop-shadow-lg"/>

                            <div>
                                <p className="text-20-medium">{posts.author.name}</p>
                                <p className="text-16-medium !text-black-300">@{posts.author.username}</p>
                            </div>
                        </Link>

                        <p className="category-tag">{posts.category}</p>
                    </div>

                    <h3 className="text-30-bold">Pitch Details</h3>

                    {parsedContent? (
                        <article className="prose max-w-4xl break-all"
                        dangerouslySetInnerHTML={{ __html: parsedContent }}/>
                    ) : (
                        <p className="no-result">No details provided</p>
                    )}
                </div>

                <hr className="devider"/>
                {/* TODO */}

                <Suspense fallback={<Skeleton className="view_skeleton"/>}>
                    <div>
                        <View id={id} />
                    </div>

                </Suspense>
            </section>
        </>
    )
}
export default Page
