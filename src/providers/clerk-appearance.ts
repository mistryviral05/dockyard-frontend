/**
 * Clerk renders its own markup, so it cannot read our tailwind tokens. These
 * values mirror the palette in globals.css and keep the hosted forms on the
 * same dark surface as the rest of the app.
 */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#ffdd27",
    colorPrimaryForeground: "#1c1600",
    colorBackground: "#141310",
    colorForeground: "#f4f4f3",
    colorMuted: "#1e1d1a",
    colorMutedForeground: "#9d9a94",
    colorInput: "#1e1d1a",
    colorInputForeground: "#f4f4f3",
    colorBorder: "#2a2823",
    colorShadow: "#000000",
    colorModalBackdrop: "rgba(6, 7, 9, 0.72)",
    colorDanger: "#f87171",
    colorSuccess: "#34d399",
    colorWarning: "#fbbf24",
    borderRadius: "0.55rem",
  },
} as const
