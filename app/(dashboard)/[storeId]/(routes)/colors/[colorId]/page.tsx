import { ObjectId } from "bson"
import React from "react"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidColoridParam } from "@/types/pages-props.interface"
import { ClientForm } from "./components/form"

const ColorNewPage: React.FC<Readonly<IPropsWithStoreidColoridParam>> = async ({ params: { colorId } }) => {
  const color = ObjectId.isValid(colorId)
    ? await prismadb.color.findUnique({
        where: { id: colorId },
      })
    : null

  return <ClientForm initialData={color} />
}

export default ColorNewPage
