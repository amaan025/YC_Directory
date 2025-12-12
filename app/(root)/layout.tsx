import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Suspense fallback={null}>
                <Navbar />
            </Suspense>
            {children}
        </main>
    );
}
