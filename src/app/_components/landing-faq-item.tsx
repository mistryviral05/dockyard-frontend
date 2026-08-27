function LandingFaqItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-6">
      <h3 className="font-heading text-sm font-medium">{question}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
    </div>
  )
}

export { LandingFaqItem }
