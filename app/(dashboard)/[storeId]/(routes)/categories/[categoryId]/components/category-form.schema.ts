import * as zod from "zod"

export const categoryDataSchema = zod.object({
  name: zod.string().min(1),
  billboardId: zod.string().min(1),
})

export type CategoryDataType = zod.infer<typeof categoryDataSchema>
