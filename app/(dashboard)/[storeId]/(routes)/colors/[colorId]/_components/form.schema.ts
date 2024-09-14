import * as zod from "zod"

export const colorDataSchema = zod.object({
  name: zod.string().min(1),
  value: zod.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Value must be a valid hex color. Example: #FF0000"),
})

export type ColorDataType = zod.infer<typeof colorDataSchema>
