import type { Category, Color, Size } from "@prisma/client"

export type ColumnType = {
  id: string
  name: string
  price: string
  isArchived: boolean
  isFeatured: boolean
  color: Color
  size: Size
  category: Category
  createdAt: string
}
