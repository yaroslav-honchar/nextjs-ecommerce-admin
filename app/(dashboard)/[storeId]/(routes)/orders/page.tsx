import { ObjectId } from "bson"
import React from "react"
import { Dashboard } from "./components/dashboard"
import { priceFormatter } from "@/lib/price-formatter.lib"
import prismadb from "@/lib/prismadb"
import { ClientRoutes } from "@/routes/client.routes"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { format } from "date-fns/format"
import { redirect } from "next/navigation"

const OrdersPage: React.FC<Readonly<IPropsWithStoreidParam>> = async ({ params: { storeId } }) => {
  if (!ObjectId.isValid(storeId)) {
    redirect(ClientRoutes.home)
  }
  const orders = await prismadb.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedData = orders.map(({ id, isPaid, phone, address, orderItems, createdAt }) => ({
    id,
    phone,
    address,
    products: orderItems.map(({ product }) => product.name).join(","),
    totalPrice: priceFormatter(orderItems.reduce((acc, { product }) => acc + +product.price, 0)),
    isPaid,
    createdAt: format(createdAt, "MMMM do, yyyy"),
  }))

  return <Dashboard data={formattedData} />
}

export default OrdersPage
