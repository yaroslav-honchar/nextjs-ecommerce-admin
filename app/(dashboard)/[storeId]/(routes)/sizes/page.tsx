import { ObjectId } from "bson"
import React from "react"
import { Dashboard } from "./components/dashboard"
import prismadb from "@/lib/prismadb"
import { ClientRoutes } from "@/routes/client.routes"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { format } from "date-fns/format"
import { redirect } from "next/navigation"

const SizesPage: React.FC<Readonly<IPropsWithStoreidParam>> = async ({ params: { storeId } }) => {
  if (!ObjectId.isValid(storeId)) {
    redirect(ClientRoutes.home)
  }
  const sizes = await prismadb.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      name: "asc",
    },
  })

  const formattedData = sizes.map(({ id, name, value, createdAt }) => ({
    id,
    name,
    value,
    createdAt: format(createdAt, "MMMM do, yyyy"),
  }))

  return <Dashboard data={formattedData} />
}

export default SizesPage
