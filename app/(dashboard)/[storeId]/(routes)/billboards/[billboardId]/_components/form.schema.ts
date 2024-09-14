import * as zod from "zod"

export const billboardDataSchema = zod.object({
  label: zod.string().min(1),
  imageUrl: zod.string().min(1),
})

export type BillboardDataType = zod.infer<typeof billboardDataSchema>
