"use client";

import { useEffect, useRef, useState } from "react";

export default function ViewCounter({ id, initialViews }: { id: string; initialViews: number }) {
    const [views, setViews] = useState(initialViews);
    const didRun = useRef(false);

    useEffect(() => {
        if (didRun.current) return;     // avoids double-run in dev Strict Mode
        didRun.current = true;

        // optimistic bump
        setViews((v) => v + 1);

        fetch(`/api/views/${id}`, { method: "POST" })
            .then((r) => r.json())
            .then((data) => {
                if (data?.ok && typeof data.views === "number") setViews(data.views);
            })
            .catch(() => {
                // revert if you want:
                // setViews(initialViews);
            });
    }, [id, initialViews]);

    return <span className="font-black">Views: {views}</span>;
}
