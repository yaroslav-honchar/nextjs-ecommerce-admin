import { ObjectId } from "bson"

import React from "react"

import type { IPropsWithStoreidBillboardidParam } from "@/types/pages-props.interface"

import prismadb from "@/lib/prismadb"

import { BillboardForm } from "./components/billboard-form"

const BillboardsNewPage: React.FC<Readonly<IPropsWithStoreidBillboardidParam>> = async ({
  params: { billboardId },
}) => {
  const billboard = ObjectId.isValid(billboardId)
    ? await prismadb.billboard.findUnique({
        where: { id: billboardId },
      })
    : null

  return <BillboardForm initialData={billboard} />
}

export default BillboardsNewPage
