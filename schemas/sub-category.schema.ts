import type { z } from "zod"
import { object, string } from "zod"

export const subCategorySchema = object({
  name: string().min(1),
  categoryId: string().min(1),
  // meta: metaSchema,
})

export type SubCategorySchemaType = z.infer<typeof subCategorySchema>
