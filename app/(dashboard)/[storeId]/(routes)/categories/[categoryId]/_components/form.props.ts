import type { Billboard, Category } from "@prisma/client"

export interface IClientFormProps {
  initialData: Category | null
  billboards: Billboard[]
}
