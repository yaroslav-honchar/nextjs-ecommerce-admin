import { ObjectId } from "bson"
import React from "react"
import { ClientForm } from "./components/form"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidColoridParam } from "@/types/pages-props.interface"

const ColorNewPage: React.FC<Readonly<IPropsWithStoreidColoridParam>> = async ({ params: { colorId } }) => {
  const color = ObjectId.isValid(colorId)
    ? await prismadb.color.findUnique({
        where: { id: colorId },
      })
    : null

  return <ClientForm initialData={color} />
}

export default ColorNewPage
