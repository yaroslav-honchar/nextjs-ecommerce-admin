import type { z } from "zod"
import { object, string } from "zod"
import { metaSchema } from "@/schemas/meta.schema"

export const subCategorySchema = object({
  name: string().min(1),
  categoryId: string().min(1),
  meta: metaSchema,
})

export type SubCategorySchemaType = z.infer<typeof subCategorySchema>
