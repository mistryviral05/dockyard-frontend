import Link from "next/link"
import { Container } from "lucide-react"

import { LandingAuthButton } from "./landing-auth-button"

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
]

function LandingNav() {
  return (
    // The bar floats over the hero instead of spanning the full width.
    <header className="sticky top-0 z-10 w-full px-4 pt-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border border-border bg-background/90 px-4 py-2.5 shadow-sm backdrop-blur sm:px-5">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Container className="size-4" />
            </span>
            <span className="font-heading text-base font-semibold">
              Dockyard
            </span>
          </Link>

          {/* The links are anchors on this page, so they are hidden on small screens. */}
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden h-5 w-px bg-border sm:block" />
          <LandingAuthButton size="sm" />
        </div>
      </div>
    </header>
  )
}

export { LandingNav }
