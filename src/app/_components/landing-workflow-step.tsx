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
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
      <span className="flex size-8 items-center justify-center rounded-full border border-border bg-muted font-mono text-sm font-medium text-muted-foreground">
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
