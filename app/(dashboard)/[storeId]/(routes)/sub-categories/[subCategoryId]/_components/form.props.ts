import type { Category, SubCategory } from "@prisma/client"

export interface IClientFormProps {
  initialData: (SubCategory & { category: Category }) | null
  categories: Category[]
}
