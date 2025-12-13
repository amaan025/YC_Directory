import { Suspense } from "react";
import UserPageInner from "./UserPageInner";

export default function Page(props: any) {
    return (
        <Suspense fallback={null}>
            <UserPageInner {...props} />
        </Suspense>
    );
}
