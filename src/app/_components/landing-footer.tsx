import { Container } from "lucide-react"

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
]

function LandingFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg border border-border/50 bg-secondary bg-linear-to-b from-white/8 to-transparent text-primary shadow-raised">
            <Container className="size-3.5" />
          </span>
          <span className="font-heading text-sm font-semibold">Dockyard</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-muted-foreground">
          {new Date().getFullYear()} Dockyard. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export { LandingFooter }
