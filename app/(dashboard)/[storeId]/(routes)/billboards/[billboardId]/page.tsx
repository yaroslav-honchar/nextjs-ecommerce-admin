import { ObjectId } from "bson"

import React from "react"

import prismadb from "@/lib/prismadb"

import { BillboardForm } from "@/app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/components/billboard-form"

const BillboardsNewPage: React.FC<{
  params: { billboardId: string }
}> = async ({ params: { billboardId } }) => {
  const billboard = ObjectId.isValid(billboardId)
    ? await prismadb.billboard.findUnique({
        where: { id: billboardId },
      })
    : null

  return <BillboardForm initialData={billboard} />
}

export default BillboardsNewPage
