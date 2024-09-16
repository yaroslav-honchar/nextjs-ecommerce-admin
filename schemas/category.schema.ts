import type { z } from "zod"
import { object, string } from "zod"
import { metaSchema } from "@/schemas/meta.schema"

export const categorySchema = object({
  name: string().min(1),
  billboardId: string().min(1),
  meta: metaSchema,
})

export type CategorySchemaType = z.infer<typeof categorySchema>
