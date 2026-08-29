function LandingWorkflowStep({
  step,
  title,
  description,
}: {
  step: number
  title: string
  description: string
}) {
  return (
    // Sits inside the panel band, so the face drops back to the canvas colour.
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-border/50 bg-sidebar bg-linear-to-b from-white/4 to-transparent p-6 shadow-card">
      <span className="flex size-8 items-center justify-center rounded-full border border-border/50 bg-secondary bg-linear-to-b from-white/8 to-transparent font-mono text-sm font-medium text-primary shadow-raised">
        {step}
      </span>

      <h3 className="font-heading text-base font-medium">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export { LandingWorkflowStep }
