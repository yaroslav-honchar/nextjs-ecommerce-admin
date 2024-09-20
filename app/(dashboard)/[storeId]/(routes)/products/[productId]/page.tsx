import { ObjectId } from "bson"
import React from "react"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidProductidParam } from "@/types/pages-props.interface"
import { ClientForm } from "./_components/form"

const SizesNewPage: React.FC<Readonly<IPropsWithStoreidProductidParam>> = async ({
  params: { productId, storeId },
}) => {
  const product = ObjectId.isValid(productId)
    ? await prismadb.product.findUnique({
        where: { id: productId },
        include: {
          category: true,
          subcategory: true,
          meta: true,
          variants: {
            include: {
              color: true,
              sizes: true,
              images: true,
            },
          },
        },
      })
    : null

  const categoryId = product?.categoryId ? { categoryId: product.categoryId } : {}

  const [colors, sizes, categories, subCategories] = await Promise.all([
    prismadb.color.findMany({ where: { storeId } }),
    prismadb.size.findMany({
      where: {
        storeId,
        ...categoryId,
      },
    }),
    prismadb.category.findMany({ where: { storeId }, include: { sizes: true } }),
    prismadb.subCategory.findMany({
      where: {
        storeId,
        ...categoryId,
      },
    }),
  ])

  return (
    <ClientForm
      initialData={product}
      colors={colors}
      sizes={sizes}
      categories={categories}
      subCategories={subCategories}
    />
  )
}

export default SizesNewPage
