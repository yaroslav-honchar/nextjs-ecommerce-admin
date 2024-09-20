import type { z } from "zod"
import { array, boolean, coerce, object, string } from "zod"
import { metaSchema } from "@/schemas/meta.schema"

const productVariantSchema = object({
  colorId: string().min(1),
  sizeIds: array(string().min(1)),
  stock: coerce.number({ message: "Stock should be only a number" }).min(1),
  images: object({ url: string() }).array().min(1).max(8),
})

export const productSchema = object({
  name: string().min(1),
  price: coerce.number({ message: "Price should be only a number" }).min(1),
  description: string().min(1),
  isArchived: boolean(),
  isFeatured: boolean(),
  categoryId: string().min(1),
  subcategoryId: string().min(1),
  meta: metaSchema,
  variants: productVariantSchema.array().min(1),
})

export type ProductSchemaType = z.infer<typeof productSchema>
