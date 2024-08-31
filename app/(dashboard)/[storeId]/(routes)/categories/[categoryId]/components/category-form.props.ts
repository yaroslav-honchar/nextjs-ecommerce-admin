import type { Billboard, Category } from "@prisma/client"

export interface ICategoryFormProps {
  initialData: Category | null
  billboards: Billboard[]
}
