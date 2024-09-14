import type { Category, Size } from "@prisma/client"

export interface IFormProps {
  initialData: Size | null
  categories: Category[]
}
