import type { LucideIcon } from "lucide-react"

function LandingFeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    // A slab lifted off the canvas: hairline, lit top edge, soft drop.
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-border/50 bg-panel bg-linear-to-b from-white/4 to-transparent p-6 shadow-float transition-shadow hover:shadow-float-hover">
      <span className="flex size-9 items-center justify-center rounded-lg border border-border/50 bg-secondary bg-linear-to-b from-white/8 to-transparent text-primary shadow-raised">
        <Icon className="size-4.5" />
      </span>

      <h3 className="font-heading text-base font-medium">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export { LandingFeatureCard }
