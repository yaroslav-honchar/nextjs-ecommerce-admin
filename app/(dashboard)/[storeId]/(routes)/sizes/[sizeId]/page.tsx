import { ObjectId } from "bson"
import React from "react"
import { ClientForm } from "./components/form"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidSizeidParam } from "@/types/pages-props.interface"

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
