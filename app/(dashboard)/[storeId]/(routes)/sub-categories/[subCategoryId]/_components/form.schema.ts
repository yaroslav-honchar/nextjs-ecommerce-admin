import * as zod from "zod"

export const subCategoryDataSchema = zod.object({
  name: zod.string().min(1),
  categoryId: zod.string().min(1),
})

export type SubCategoryDataType = zod.infer<typeof subCategoryDataSchema>
