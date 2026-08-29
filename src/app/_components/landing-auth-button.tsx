"use client"

import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { ArrowRight } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { cn } from "@/shared/lib/utils"

/**
 * The only call to action on the page. It points to the dashboard once the
 * visitor is signed in, and to the login screen while they are not.
 */
function LandingAuthButton({
  size = "default",
  variant = "default",
  className,
  withIcon = false,
}: {
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline"
  className?: string
  withIcon?: boolean
}) {
  const { isLoaded, isSignedIn } = useAuth()

  // Clerk resolves the session on the client, so hold the space until it does.
  if (!isLoaded) {
    const placeholderSize = {
      sm: "h-8 w-24",
      default: "h-9 w-24",
      lg: "h-10 w-36",
    }[size]

    return (
      <Skeleton className={cn("rounded-md", placeholderSize, className)} />
    )
  }

  return (
    <Button
      size={size}
      variant={variant}
      nativeButton={false}
      className={className}
      render={<Link href={isSignedIn ? "/apps" : "/sign-in"} />}
    >
      {isSignedIn ? "Dashboard" : "Log in"}
      {withIcon ? <ArrowRight data-icon="inline-end" /> : null}
    </Button>
  )
}

export { LandingAuthButton }
