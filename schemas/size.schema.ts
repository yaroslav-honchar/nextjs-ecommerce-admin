import type { z } from "zod"
import { object, string } from "zod"

export const sizeSchema = object({
  name: string().min(1),
  value: string().min(1),
  categoryId: string().min(1),
})

export type SizeSchemaType = z.infer<typeof sizeSchema>
