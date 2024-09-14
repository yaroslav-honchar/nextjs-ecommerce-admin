import { ObjectId } from "bson"
import React from "react"
import prismadb from "@/lib/prismadb"
import { ClientRoutes } from "@/routes/client.routes"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import type { ColumnType } from "./components/column.type"
import { Dashboard } from "./components/dashboard"
import type { Billboard } from "@prisma/client"
import { format } from "date-fns/format"
import { redirect } from "next/navigation"

const BillboardsPage: React.FC<Readonly<IPropsWithStoreidParam>> = async ({ params: { storeId } }) => {
  if (!ObjectId.isValid(storeId)) {
    redirect(ClientRoutes.home)
  }
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedData: ColumnType[] = billboards.map(
    (billboard: Billboard): ColumnType => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    }),
  )

  return <Dashboard data={formattedData} />
}

export default BillboardsPage
