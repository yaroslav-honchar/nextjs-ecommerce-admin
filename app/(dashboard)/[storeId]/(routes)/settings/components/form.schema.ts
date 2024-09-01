import * as zod from "zod"

export const storeDataSchema = zod.object({
  name: zod.string().min(1),
})

export type StoreDataType = zod.infer<typeof storeDataSchema>
