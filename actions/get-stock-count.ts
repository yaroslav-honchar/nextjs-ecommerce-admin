import prismadb from "@/lib/prismadb"

export const getStockCount = async (storeId: string): Promise<number> => {
  return prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  })
}
