import { Suspense } from "react"

import ImportPage from "./_components/ImportPage";


export default function page() {
    return (
        // The repo details are read from the query string, so the page needs a boundary.
        <Suspense>
            <ImportPage />
        </Suspense>
    )
}
