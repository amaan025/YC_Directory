import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

export async function POST(
    _req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await writeClient
            .patch(params.id)
            .inc({ views: 1 }) // atomic increment
            .setIfMissing({ views: 0 })
            .commit();

        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
