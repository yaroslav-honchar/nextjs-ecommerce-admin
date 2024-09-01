import { ObjectId } from "bson"
import React from "react"
import type { IPropsWithStoreidSizeidParam } from "@/types/pages-props.interface"
import prismadb from "@/lib/prismadb"
import { ClientForm } from "./components/form"

const SizesNewPage: React.FC<Readonly<IPropsWithStoreidSizeidParam>> = async ({ params: { sizeId } }) => {
  const size = ObjectId.isValid(sizeId)
    ? await prismadb.size.findUnique({
        where: { id: sizeId },
      })
    : null

  return <ClientForm initialData={size} />
}

export default SizesNewPage
