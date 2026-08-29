function LandingFaqItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  return (
    <div className="flex h-full flex-col gap-2 rounded-2xl border border-border/50 bg-sidebar bg-linear-to-b from-white/4 to-transparent p-6 shadow-card">
      <h3 className="font-heading text-sm font-medium">{question}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
    </div>
  )
}

export { LandingFaqItem }
