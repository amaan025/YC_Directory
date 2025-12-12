import { Suspense } from "react";
import CreateStartupInner from "./CreateStartupInner";

export default function Page() {
    return (
        <Suspense fallback={null}>
            <CreateStartupInner />
        </Suspense>
    );
}
