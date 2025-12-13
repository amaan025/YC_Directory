// app/(root)/startup/[id]/page.tsx
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import StartupContent from "@/components/StartupContent";
import View from "@/components/View";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return (
        <>
            <Suspense fallback={<Skeleton className="content_skeleton" />}>
                <StartupContent params={params} />
            </Suspense>

            <Suspense fallback={<Skeleton className="view_skeleton" />}>
                <View params={params} />
            </Suspense>
        </>
    );
}
