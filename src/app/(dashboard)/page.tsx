import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
    // await auth.protect()
    redirect('/apps')


    return (
        <></>
    )
}
