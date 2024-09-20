import type { Category } from "@prisma/client"

export type ColumnType = {
  id: string
  name: string
  price: string
  isArchived: boolean
  isFeatured: boolean
  category: Category
  createdAt: string
}
