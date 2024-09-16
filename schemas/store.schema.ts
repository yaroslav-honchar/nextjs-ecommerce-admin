import type { z } from "zod"
import { object, string } from "zod"

export const storeSchema = object({
  name: string().min(1),
})

export type StoreSchemaType = z.infer<typeof storeSchema>
