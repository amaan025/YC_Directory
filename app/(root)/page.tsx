import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import {SearchParams} from "next/dist/server/request/search-params";
import StartupCard, {StartupCardType} from "@/components/StartupCard";
import {client} from "@/sanity/lib/client";
import {STARTUP_QUERY} from "@/sanity/lib/queries";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}){



    const query = (await searchParams).query;

    const posts = await client.fetch(STARTUP_QUERY)

    // const posts = [{
    //     _createdAt: new Date(),
    //     views: 55,
    //     author: {_id: 1, name: "Amaan Ahmad"},
    //     _id: 1,
    //     description: 'This is a description',
    //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNu5Y7TGPb_e2NEy4KhUaWwQxF3RRtxb80YQ&s",
    //     category: "Artificial Intelligence",
    //     title: "AI"
    // }]
  return (
      <>
          <section className="pink_container pattern">
              <h1 className="heading">Pitch Your Startup, <br/> Connect With Entrepreneurs</h1>
              <p className="sub-heading !max-w-3xl">
                  Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
              </p>
              <SearchForm query={query}/>
          </section>

          <section className="section-container">
              <p className="text-30-semibold">
                  {query ? `Search results for ${query}` : 'All Startups'}
              </p>

              <ul className="mt-7 card_grid">
                  {posts?. length > 0 ? (
                      posts.map((posts: StartupCardType, index: number) => (
                          <StartupCard key={posts?._id} posts={posts}/>
                      ))
                  ): (
                      <p className="no-results">No startups found</p>
                  )}
              </ul>
          </section>

      </>
  );
}
