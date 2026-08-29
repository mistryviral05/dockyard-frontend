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
    <header className="sticky top-0 z-20 w-full px-4 pt-4 sm:px-6">
      {/* Same slab as a card: hairline, lit top edge, soft drop underneath. */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border border-border/50 bg-panel/80 bg-linear-to-b from-white/4 to-transparent px-3 py-2 shadow-float backdrop-blur-xl sm:px-4">
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-2 py-1.5 outline-none transition-colors hover:bg-accent/50 focus-visible:ring-3 focus-visible:ring-ring/30"
          >
            <span className="flex size-7 items-center justify-center rounded-lg border border-border/50 bg-secondary bg-linear-to-b from-white/8 to-transparent text-primary shadow-raised">
              <Container className="size-4" />
            </span>
            <span className="font-heading text-base font-semibold">
              Dockyard
            </span>
          </Link>

          {/* The links are anchors on this page, so they are hidden on small screens. */}
          <nav className="hidden items-center gap-1 pl-4 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-accent/50 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/30"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#pricing"
            className="hidden h-8 items-center rounded-md border border-border/50 bg-secondary bg-linear-to-b from-white/8 to-transparent px-3 text-sm font-medium text-secondary-foreground shadow-raised outline-none transition-all hover:bg-[color-mix(in_oklch,var(--secondary),white_6%)] focus-visible:ring-3 focus-visible:ring-ring/30 active:translate-y-px active:shadow-raised-sunken sm:inline-flex"
          >
            Pricing
          </a>
          <LandingAuthButton size="sm" />
        </div>
      </div>
    </header>
  )
}

export { LandingNav }
