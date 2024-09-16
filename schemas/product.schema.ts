import type { z } from "zod"
import { boolean, coerce, object, string } from "zod"
import { metaSchema } from "@/schemas/meta.schema"

export const productSchema = object({
  name: string().min(1),
  price: coerce.number({ message: "Price should be only a number" }).min(1),
  description: string().min(1),
  isArchived: boolean(),
  isFeatured: boolean(),
  colorId: string().min(1),
  sizeId: string().min(1),
  categoryId: string().min(1),
  images: object({ url: string() }).array().min(1).max(8),
  meta: metaSchema,
})

export type ProductSchemaType = z.infer<typeof productSchema>
