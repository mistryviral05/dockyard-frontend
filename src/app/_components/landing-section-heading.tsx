import { cn } from "@/shared/lib/utils"

function LandingSectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <span className="text-xs font-medium tracking-wide text-primary uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-3 max-w-2xl font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export { LandingSectionHeading }
