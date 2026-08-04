import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const spinnerVariants = cva("shrink-0", {
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
      xs: "size-3",
      sm: "size-4",
      default: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
  },
  defaultVariants: {
    variant: "current",
    size: "default",
  },
})

type SpinnerProps = React.ComponentProps<"span"> &
  VariantProps<typeof spinnerVariants> & {
    /** Accessible label announced to screen readers. */
    label?: string
  }

function Spinner({
  className,
  variant,
  size,
  label = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-live="polite"
      className={cn(spinnerVariants({ variant, size }), className)}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-full animate-spin animation-duration-[0.7s]"
      >
        {/* Track */}
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={3}
        />
        {/* Rotating arc */}
        <path
          d="M12 3a9 9 0 0 1 9 9"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}

export { Spinner, spinnerVariants }
