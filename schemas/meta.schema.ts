import type { z } from "zod"
import { object, string } from "zod"

export const metaSchema = object({
  title: string().min(1, "Title is required"),
  description: string().min(1, "Description is required"),
  keywords: string().min(1, "At least one keyword is required"),
})

export type MetaDataType = z.infer<typeof metaSchema>
