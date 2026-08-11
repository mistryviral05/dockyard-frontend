"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { TokenExpiry } from "./token-expiry"

function AgentRunCommand({
  command,
  expiresAt,
}: {
  command: string
  expiresAt: string
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2 rounded-2xl bg-muted p-3">
        <code className="min-w-0 flex-1 font-mono text-xs leading-relaxed break-all text-foreground">
          {command}
        </code>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={copied ? "Copied" : "Copy command"}
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="size-4 text-primary" />
          ) : (
            <Copy className="size-4" />
          )}
        </Button>
      </div>
      <TokenExpiry expiresAt={expiresAt} />
    </div>
  )
}

export { AgentRunCommand }
