import { ObjectId } from "bson"
import React from "react"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidSizeidParam } from "@/types/pages-props.interface"
import { ClientForm } from "./components/form"

const SizesNewPage: React.FC<Readonly<IPropsWithStoreidSizeidParam>> = async ({ params: { sizeId, storeId } }) => {
  const size = ObjectId.isValid(sizeId)
    ? await prismadb.size.findUnique({
        where: { id: sizeId },
      })
    : null

  const categories = await prismadb.category.findMany({
    where: { storeId },
  })

  return (
    <ClientForm
      initialData={size}
      categories={categories}
    />
  )
}

export default SizesNewPage
