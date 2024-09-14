import type { Category } from "@prisma/client"

export type ColumnType = {
  id: string
  name: string
  value: string
  category: Category
  createdAt: string
}
