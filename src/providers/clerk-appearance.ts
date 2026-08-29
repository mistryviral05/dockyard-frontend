/**
 * Clerk renders its own markup, so it cannot read our tailwind tokens. The
 * variables mirror the palette in globals.css and the elements re-use the same
 * class recipes as `ui/button.tsx` and `ui/input.tsx`, so the hosted forms read
 * as one of our own cards.
 */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#ffdd27",
    colorPrimaryForeground: "#1c1600",
    /* The card sits on the same face as the sidebar. */
    colorBackground: "#0c0a09",
    colorForeground: "#f4f4f3",
    colorMuted: "#161515",
    colorMutedForeground: "#a09c95",
    colorInput: "#161515",
    colorInputForeground: "#f4f4f3",
    colorBorder: "#3a3733",
    colorShadow: "#000000",
    colorModalBackdrop: "rgba(6, 7, 9, 0.72)",
    colorDanger: "#f87171",
    colorSuccess: "#34d399",
    colorWarning: "#fbbf24",
    borderRadius: "0.5rem",
    fontFamily: "var(--font-sans)",
  },
  elements: {
    cardBox:
      "rounded-2xl border border-border/50 bg-sidebar shadow-card overflow-hidden",
    card: "bg-sidebar",
    headerTitle: "font-heading text-xl font-semibold tracking-tight",
    headerSubtitle: "text-sm text-muted-foreground",

    /* Same face as the default button: white, dark text, lit from above. */
    formButtonPrimary:
      "h-9 rounded-md border border-black/25 bg-foreground bg-linear-to-b from-white/70 to-black/10 text-sm font-medium normal-case tracking-normal text-background shadow-raised-light transition-all hover:bg-[color-mix(in_oklch,var(--foreground),black_8%)] active:translate-y-px active:shadow-raised-light-sunken",

    /* Social and alternative methods take the outline face. */
    socialButtonsBlockButton:
      "h-9 rounded-md border border-border/50 bg-secondary bg-linear-to-b from-white/8 to-transparent text-sm font-medium normal-case text-secondary-foreground shadow-raised transition-all hover:bg-[color-mix(in_oklch,var(--secondary),white_6%)] active:translate-y-px active:shadow-raised-sunken",
    socialButtonsBlockButtonText: "text-secondary-foreground",
    alternativeMethodsBlockButton:
      "h-9 rounded-md border border-border/50 bg-secondary bg-linear-to-b from-white/8 to-transparent text-sm font-medium normal-case text-secondary-foreground shadow-raised transition-all hover:bg-[color-mix(in_oklch,var(--secondary),white_6%)]",

    dividerLine: "bg-border/50",
    dividerText: "text-xs text-muted-foreground",

    formFieldLabel: "text-sm font-medium text-foreground",
    formFieldInput:
      "h-9 rounded-md border border-border/50 bg-secondary px-3 text-sm text-foreground transition-[color,box-shadow,background-color] placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/30",
    otpCodeFieldInput: "rounded-md border-border/50 bg-secondary",

    formFieldAction: "text-xs font-medium text-primary hover:underline",
    identityPreview: "rounded-md border border-border/50 bg-secondary",
    footer: "bg-sidebar border-t border-border/50",
    footerAction: "bg-sidebar",
    footerActionText: "text-sm text-muted-foreground",
    footerActionLink: "text-sm font-medium text-primary hover:underline",
  },
} as const
