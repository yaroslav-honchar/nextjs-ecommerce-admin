import type { Category, Color, Image, Product, Size, SubCategory } from "@prisma/client"

export interface IFormProps {
  initialData:
    | (Product & {
        images: Image[]
      })
    | null
  colors: Color[]
  sizes: Size[]
  categories: (Category & { sizes: Size[] })[]
  subCategories: SubCategory[]
}
