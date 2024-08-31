import * as zod from "zod"

export const formSchema = zod.object({
  name: zod.string().min(1),
  billboardId: zod.string().min(1),
})

export type CategoryFormValuesType = zod.infer<typeof formSchema>
