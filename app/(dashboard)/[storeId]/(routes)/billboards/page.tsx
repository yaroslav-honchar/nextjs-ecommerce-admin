import { ObjectId } from "bson"
import React from "react"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { ClientRoutes } from "@/routes/client.routes"
import prismadb from "@/lib/prismadb"
import { BillboardClient } from "./components/client"
import type { BillboardColumnType } from "./components/columns"
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

  const formattedBillboards: BillboardColumnType[] = billboards.map(
    (billboard: Billboard): BillboardColumnType => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    }),
  )

  return <BillboardClient data={formattedBillboards} />
}

export default BillboardsPage
