"use client"

import { useEffect, useState } from "react"
import { formatDistanceToNowStrict, isPast } from "date-fns"
import { Clock } from "lucide-react"

import { cn } from "@/shared/lib/utils"

/** Live countdown for the one-time install token. */
function TokenExpiry({ expiresAt }: { expiresAt: string }) {
  const date = new Date(expiresAt)
  const [expired, setExpired] = useState(() => isPast(date))
  const [remaining, setRemaining] = useState(() =>
    formatDistanceToNowStrict(date)
  )

  useEffect(() => {
    const target = new Date(expiresAt)
    const tick = () => {
      setExpired(isPast(target))
      setRemaining(formatDistanceToNowStrict(target))
    }

    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [expiresAt])

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs",
        expired ? "text-destructive" : "text-muted-foreground"
      )}
    >
      <Clock className="size-3.5" />
      {expired ? "Command expired" : `Expires in ${remaining}`}
    </span>
  )
}

export { TokenExpiry }
