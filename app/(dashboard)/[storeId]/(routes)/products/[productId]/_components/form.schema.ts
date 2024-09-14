import * as zod from "zod"

export const productDataSchema = zod.object({
  name: zod.string().min(1),
  price: zod.coerce.number({ message: "Price should be only a number" }).min(1),
  isArchived: zod.boolean(),
  isFeatured: zod.boolean(),
  colorId: zod.string().min(1),
  sizeId: zod.string().min(1),
  categoryId: zod.string().min(1),
  images: zod.object({ url: zod.string() }).array().min(1).max(8),
})

export type ProductDataType = zod.infer<typeof productDataSchema>
