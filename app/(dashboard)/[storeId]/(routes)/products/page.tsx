import { ObjectId } from "bson"
import React from "react"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { ClientRoutes } from "@/routes/client.routes"
import { priceFormatter } from "@/lib/price-formatter.lib"
import prismadb from "@/lib/prismadb"
import { Dashboard } from "./components/dashboard"
import { format } from "date-fns/format"
import { redirect } from "next/navigation"

const SizesPage: React.FC<Readonly<IPropsWithStoreidParam>> = async ({ params: { storeId } }) => {
  if (!ObjectId.isValid(storeId)) {
    redirect(ClientRoutes.home)
  }
  const products = await prismadb.product.findMany({
    where: {
      storeId,
    },
    include: {
      category: true,
      color: true,
      size: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  const formattedData = products.map(
    ({ id, name, price, isArchived, isFeatured, category, color, size, createdAt }) => ({
      id,
      name,
      isArchived,
      isFeatured,
      category,
      color,
      size,
      price: priceFormatter(price),
      createdAt: format(createdAt, "MMMM do, yyyy"),
    }),
  )

  return <Dashboard data={formattedData} />
}

export default SizesPage
