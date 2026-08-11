import { z } from "zod"

/** Port the agent listens on when the user does not pick one. */
export const DEFAULT_AGENT_PORT = "8999"

export const createAgentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  port: z
    .string()
    .trim()
    // Port is optional — an empty field falls back to the default.
    .transform((value) => (value === "" ? DEFAULT_AGENT_PORT : value))
    .pipe(
      z
        .string()
        .regex(/^\d+$/, "Port must be a number")
        .refine((value) => {
          const port = Number(value)
          return port >= 1 && port <= 65535
        }, "Port must be between 1 and 65535")
    ),
})

/** Form values as typed by the user (port may be left empty). */
export type CreateAgentValues = z.input<typeof createAgentSchema>
/** Validated values, with the default port applied. */
export type CreateAgentPayload = z.output<typeof createAgentSchema>
