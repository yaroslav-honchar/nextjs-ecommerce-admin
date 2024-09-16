import type { z } from "zod"
import { object, string } from "zod"

export const billboardSchema = object({
  label: string().min(1),
  imageUrl: string().min(1),
})

export type BillboardSchemaType = z.infer<typeof billboardSchema>
