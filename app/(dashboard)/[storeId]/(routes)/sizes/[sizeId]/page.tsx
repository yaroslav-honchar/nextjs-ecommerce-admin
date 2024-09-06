import { ObjectId } from "bson"
import React from "react"
import { ClientForm } from "./components/form"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidSizeidParam } from "@/types/pages-props.interface"

const SizesNewPage: React.FC<Readonly<IPropsWithStoreidSizeidParam>> = async ({ params: { sizeId } }) => {
  const size = ObjectId.isValid(sizeId)
    ? await prismadb.size.findUnique({
        where: { id: sizeId },
      })
    : null

  return <ClientForm initialData={size} />
}

export default SizesNewPage
