import { ObjectId } from "bson"
import React from "react"
import type { IPropsWithStoreidProductidParam } from "@/types/pages-props.interface"
import prismadb from "@/lib/prismadb"
import { ClientForm } from "./components/form"

const SizesNewPage: React.FC<Readonly<IPropsWithStoreidProductidParam>> = async ({
  params: { productId, storeId },
}) => {
  const product = ObjectId.isValid(productId)
    ? await prismadb.product.findUnique({
        where: { id: productId },
        include: { images: true },
      })
    : null

  const colors = await prismadb.color.findMany({
    where: { storeId },
  })

  const sizes = await prismadb.size.findMany({
    where: { storeId },
  })

  const categories = await prismadb.category.findMany({
    where: { storeId },
  })

  return (
    <ClientForm
      initialData={product}
      colors={colors}
      sizes={sizes}
      categories={categories}
    />
  )
}

export default SizesNewPage
