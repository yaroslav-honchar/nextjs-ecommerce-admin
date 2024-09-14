import { ObjectId } from "bson"
import React from "react"
import { ClientForm } from "@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/_components/form"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidCategoryidParam } from "@/types/pages-props.interface"

const CategoriesNewPage: React.FC<Readonly<IPropsWithStoreidCategoryidParam>> = async ({
  params: { categoryId, storeId },
}) => {
  const category = ObjectId.isValid(categoryId)
    ? await prismadb.category.findUnique({
        where: { id: categoryId },
      })
    : null

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
  })

  return (
    <ClientForm
      initialData={category}
      billboards={billboards}
    />
  )
}

export default CategoriesNewPage
