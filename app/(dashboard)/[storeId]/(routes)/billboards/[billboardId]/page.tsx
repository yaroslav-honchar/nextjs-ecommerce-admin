import { ObjectId } from "bson"
import React from "react"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidBillboardidParam } from "@/types/pages-props.interface"
import { ClientForm } from "./components/form"

const BillboardsNewPage: React.FC<Readonly<IPropsWithStoreidBillboardidParam>> = async ({
  params: { billboardId, storeId },
}) => {
  const billboard = ObjectId.isValid(billboardId)
    ? await prismadb.billboard.findUnique({
        where: { id: billboardId, storeId },
      })
    : null

  return <ClientForm initialData={billboard} />
}

export default BillboardsNewPage
