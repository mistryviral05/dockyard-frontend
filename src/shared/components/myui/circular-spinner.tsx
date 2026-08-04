import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const circularSpinnerVariants = cva("inline-flex shrink-0", {
  variants: {
    variant: {
      /** Inherits the surrounding text color — ideal inside a Button. */
      current: "text-current",
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
    },
    size: {
      xs: "size-4",
      sm: "size-5",
      default: "size-6",
      lg: "size-8",
      xl: "size-10",
    },
  },
  defaultVariants: {
    variant: "current",
    size: "default",
  },
})

type CircularSpinnerProps = React.ComponentProps<"span"> &
  VariantProps<typeof circularSpinnerVariants> & {
    /** Accessible label announced to screen readers. */
    label?: string
  }

/**
 * MUI-style indeterminate circular progress: the SVG rotates at a constant rate
 * while the stroke arc grows and shrinks, giving the familiar "Material" feel.
 */
function CircularSpinner({
  className,
  variant,
  size,
  label = "Loading",
  ...props
}: CircularSpinnerProps) {
  return (
    <span
      data-slot="circular-spinner"
      role="status"
      aria-live="polite"
      className={cn(circularSpinnerVariants({ variant, size }), className)}
      {...props}
    >
      <svg
        viewBox="22 22 44 44"
        className="size-full animate-spin animation-duration-[1.4s]"
      >
        <circle
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.6"
          strokeLinecap="round"
          className="animate-[mui-circular-dash_1.4s_ease-in-out_infinite]"
          style={{ strokeDasharray: "80px, 200px", strokeDashoffset: 0 }}
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}

export { CircularSpinner, circularSpinnerVariants }
