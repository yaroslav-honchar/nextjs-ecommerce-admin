import { ObjectId } from "bson"

import React from "react"

import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"

import { ClientRoutes } from "@/routes/client.routes"

import prismadb from "@/lib/prismadb"

import { BillboardClient } from "./components/client"
import { redirect } from "next/navigation"

const BillboardsPage: React.FC<Readonly<IPropsWithStoreidParam>> = async ({
  params: { storeId },
}) => {
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

  return <BillboardClient data={billboards} />
}

export default BillboardsPage
