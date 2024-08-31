import { ObjectId } from "bson"

import React from "react"

import type { IPropsWithStoreidCategoryidParam } from "@/types/pages-props.interface"

import prismadb from "@/lib/prismadb"

import { CategoryForm } from "./components/category-form"

const BillboardsNewPage: React.FC<Readonly<IPropsWithStoreidCategoryidParam>> = async ({
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
    <CategoryForm
      initialData={category}
      billboards={billboards}
    />
  )
}

export default BillboardsNewPage
