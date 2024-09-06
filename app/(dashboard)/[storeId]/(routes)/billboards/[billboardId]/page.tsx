import { ObjectId } from "bson"
import React from "react"
import { ClientForm } from "./components/form"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidBillboardidParam } from "@/types/pages-props.interface"

const BillboardsNewPage: React.FC<Readonly<IPropsWithStoreidBillboardidParam>> = async ({
  params: { billboardId },
}) => {
  const billboard = ObjectId.isValid(billboardId)
    ? await prismadb.billboard.findUnique({
        where: { id: billboardId },
      })
    : null

  return <ClientForm initialData={billboard} />
}

export default BillboardsNewPage
