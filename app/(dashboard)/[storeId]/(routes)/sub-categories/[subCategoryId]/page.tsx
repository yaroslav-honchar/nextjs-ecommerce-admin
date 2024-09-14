import { ObjectId } from "bson"
import React from "react"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidSubCategoryidParam } from "@/types/pages-props.interface"
import { ClientForm } from "./components/form"

const CategoriesNewPage: React.FC<Readonly<IPropsWithStoreidSubCategoryidParam>> = async ({
  params: { subCategoryId, storeId },
}) => {
  const subCategory = ObjectId.isValid(subCategoryId)
    ? await prismadb.subCategory.findUnique({
        where: { id: subCategoryId },
        include: { category: true },
      })
    : null

  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
  })

  return (
    <ClientForm
      initialData={subCategory}
      categories={categories}
    />
  )
}

export default CategoriesNewPage
