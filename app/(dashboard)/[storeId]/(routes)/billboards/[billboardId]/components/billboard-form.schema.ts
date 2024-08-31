import * as zod from "zod"

export const formSchema = zod.object({
  label: zod.string().min(1),
  imageUrl: zod.string().min(1),
})

export type BillboardFormValuesType = zod.infer<typeof formSchema>
