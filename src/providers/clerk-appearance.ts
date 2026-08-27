/**
 * Clerk renders its own markup, so it cannot read our tailwind tokens. These
 * values mirror the palette in globals.css and keep the hosted forms on the
 * same dark surface as the rest of the app.
 */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#8b5cf6",
    colorPrimaryForeground: "#faf5ff",
    colorBackground: "#101216",
    colorForeground: "#f4f5f7",
    colorMuted: "#1b1d22",
    colorMutedForeground: "#9aa0ab",
    colorInput: "#1b1d22",
    colorInputForeground: "#f4f5f7",
    colorBorder: "#26292f",
    colorShadow: "#000000",
    colorModalBackdrop: "rgba(6, 7, 9, 0.72)",
    colorDanger: "#f87171",
    colorSuccess: "#34d399",
    colorWarning: "#fbbf24",
    borderRadius: "0.55rem",
  },
} as const
