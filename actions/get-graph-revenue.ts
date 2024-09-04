import type { GraphData } from "@/types/graph-data.interface"
import prismadb from "@/lib/prismadb"

export const getGraphRevenue = async (storeId: string): Promise<GraphData[]> => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  })

  const monthlyRevenue: Record<number, number> = {}

  for (const paidOrder of paidOrders) {
    const month = paidOrder.createdAt.getMonth()
    let revenueForOrder: number = 0

    for (const item of paidOrder.orderItems) {
      revenueForOrder += item.product.price
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder
  }

  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ]

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
  }

  return graphData
}
