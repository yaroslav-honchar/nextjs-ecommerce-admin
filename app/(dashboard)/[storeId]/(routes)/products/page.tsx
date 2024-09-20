import { ObjectId } from "bson"
import React from "react"
import { Dashboard } from "@/app/(dashboard)/[storeId]/(routes)/products/_components/dashboard"
import { priceFormatter } from "@/lib/price-formatter.lib"
import prismadb from "@/lib/prismadb"
import { ClientRoutes } from "@/routes/client.routes"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
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
      subcategory: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedData = products.map(({ id, name, price, isArchived, isFeatured, category, createdAt }) => ({
    id,
    name,
    isArchived,
    isFeatured,
    category,
    price: priceFormatter(price),
    createdAt: format(createdAt, "MMMM do, yyyy"),
  }))

  return <Dashboard data={formattedData} />
}

export default SizesPage
