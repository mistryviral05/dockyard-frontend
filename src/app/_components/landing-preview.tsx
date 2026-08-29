import { cn } from "@/shared/lib/utils"

// A still picture of the deployment view, so it is markup and not a screenshot.
const logLines = [
  { time: "12:04:01", text: "Cloning github.com/acme/storefront (main)", tone: "muted" },
  { time: "12:04:06", text: "Building image storefront:8f21c04", tone: "default" },
  { time: "12:04:22", text: "npm warn deprecated request@2.88.2", tone: "warning" },
  { time: "12:05:10", text: "Image pushed to registry", tone: "default" },
  { time: "12:05:14", text: "Starting container on agent mumbai-1", tone: "default" },
  { time: "12:05:19", text: "Deployment is live", tone: "success" },
] as const

const toneStyles = {
  default: "text-foreground/90",
  muted: "text-muted-foreground",
  warning: "text-warning",
  success: "text-success",
}

function LandingPreview() {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl border border-border/50 bg-panel bg-linear-to-b from-white/4 to-transparent p-1.5 shadow-float">
      <div className="overflow-hidden rounded-[1.15rem] border border-border/50 bg-sidebar">
        <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
          <span className="size-2.5 rounded-full bg-destructive/40" />
          <span className="size-2.5 rounded-full bg-warning/40" />
          <span className="size-2.5 rounded-full bg-success/40" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            dockyard.app/deployments
          </span>
        </div>

        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-heading text-sm font-medium">storefront</p>
              <p className="font-mono text-xs text-muted-foreground">
                main at 8f21c04
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
              <span className="size-1.5 rounded-full bg-success" />
              Live
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/50 bg-secondary/60">
            <div className="border-b border-border/50 bg-secondary px-4 py-2">
              <span className="font-mono text-xs text-muted-foreground">
                Build logs
              </span>
            </div>

            <div className="flex flex-col py-2">
              {logLines.map((line) => (
                <div key={line.time} className="flex gap-3 px-4 py-0.5">
                  <span className="shrink-0 font-mono text-xs text-muted-foreground/70 tabular-nums select-none">
                    {line.time}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate font-mono text-xs",
                      toneStyles[line.tone]
                    )}
                  >
                    {line.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { LandingPreview }
