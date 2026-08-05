import { auth } from '@clerk/nextjs/server'
import CallbackPage from './_components/CallbackPage'

export default async function page() {
    await auth.protect()
    return (
        <CallbackPage />
    )
}
