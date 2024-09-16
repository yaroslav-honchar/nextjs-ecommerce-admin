import type { z } from "zod"
import { object, string } from "zod"

export const colorSchema = object({
  name: string().min(1),
  value: string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Value must be a valid hex color. Example: #FF0000"),
})

export type ColorSchemaType = z.infer<typeof colorSchema>
