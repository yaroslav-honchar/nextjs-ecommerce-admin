import { ObjectId } from "bson"
import React from "react"
import prismadb from "@/lib/prismadb"
import { ClientRoutes } from "@/routes/client.routes"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { Dashboard } from "./components/dashboard"
import { format } from "date-fns/format"
import { redirect } from "next/navigation"

const SubCategoriesPage: React.FC<Readonly<IPropsWithStoreidParam>> = async ({ params: { storeId } }) => {
  if (!ObjectId.isValid(storeId)) {
    redirect(ClientRoutes.home)
  }
  const subCategories = await prismadb.subCategory.findMany({
    where: {
      storeId,
    },
    include: {
      category: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  const formattedData = subCategories.map(({ id, name, category, createdAt }) => ({
    id,
    name,
    categoryLabel: category.name,
    createdAt: format(createdAt, "MMMM do, yyyy"),
  }))

  return <Dashboard data={formattedData} />
}

export default SubCategoriesPage
