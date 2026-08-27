import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center cursor-pointer rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // The gradient sits on top of the solid colour, so the face reads as
        // lit from above while the inset shadows carve the edges.
        // The main action is a white face with dark text. Yellow stays
        // reserved for state, so a primary button never competes with it.
        default:
          "bg-foreground bg-linear-to-b from-white/40 to-transparent text-background shadow-raised hover:bg-[color-mix(in_oklch,var(--foreground),black_8%)] active:shadow-raised-sunken",
        outline:
          "border-border bg-secondary bg-linear-to-b from-white/8 to-transparent text-secondary-foreground shadow-raised hover:bg-[color-mix(in_oklch,var(--secondary),white_6%)] aria-expanded:bg-accent active:shadow-raised-sunken",
        secondary:
          "bg-secondary bg-linear-to-b from-white/8 to-transparent text-secondary-foreground shadow-raised hover:bg-[color-mix(in_oklch,var(--secondary),white_6%)] aria-expanded:bg-accent active:shadow-raised-sunken",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive/15 bg-linear-to-b from-white/8 to-transparent text-destructive shadow-raised hover:bg-destructive/25 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 active:shadow-raised-sunken",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
