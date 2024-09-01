import { ObjectId } from "bson"
import React from "react"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { ClientRoutes } from "@/routes/client.routes"
import prismadb from "@/lib/prismadb"
import { Dashboard } from "./components/dashboard"
import { format } from "date-fns/format"
import { redirect } from "next/navigation"

const ColorsPage: React.FC<Readonly<IPropsWithStoreidParam>> = async ({ params: { storeId } }) => {
  if (!ObjectId.isValid(storeId)) {
    redirect(ClientRoutes.home)
  }
  const colors = await prismadb.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      name: "asc",
    },
  })

  const formattedData = colors.map(({ id, name, value, createdAt }) => ({
    id,
    name,
    value,
    createdAt: format(createdAt, "MMMM do, yyyy"),
  }))

  return <Dashboard data={formattedData} />
}

export default ColorsPage
