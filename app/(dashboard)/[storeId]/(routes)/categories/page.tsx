import { ObjectId } from "bson"
import React from "react"
import { Dashboard } from "./components/dashboard"
import prismadb from "@/lib/prismadb"
import { ClientRoutes } from "@/routes/client.routes"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { format } from "date-fns/format"
import { redirect } from "next/navigation"

const CategoriesPage: React.FC<Readonly<IPropsWithStoreidParam>> = async ({ params: { storeId } }) => {
  if (!ObjectId.isValid(storeId)) {
    redirect(ClientRoutes.home)
  }
  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  const formattedData = categories.map(({ id, name, billboard, createdAt }) => ({
    id,
    name,
    billboardLabel: billboard.label,
    createdAt: format(createdAt, "MMMM do, yyyy"),
  }))

  return <Dashboard data={formattedData} />
}

export default CategoriesPage
