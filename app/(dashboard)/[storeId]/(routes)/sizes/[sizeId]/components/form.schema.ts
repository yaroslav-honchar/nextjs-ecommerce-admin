import * as zod from "zod"

export const sizeDataSchema = zod.object({
  name: zod.string().min(1),
  value: zod.string().min(1),
  categoryId: zod.string().min(1),
})

export type SizeDataType = zod.infer<typeof sizeDataSchema>
