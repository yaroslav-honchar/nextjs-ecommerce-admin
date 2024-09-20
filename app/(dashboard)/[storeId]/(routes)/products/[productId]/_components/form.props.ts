import type { Category, Color, Product, Size, SubCategory } from "@prisma/client"

export interface IFormProps {
  initialData: Product | null
  colors: Color[]
  sizes: Size[]
  categories: (Category & { sizes: Size[] })[]
  subCategories: SubCategory[]
}
