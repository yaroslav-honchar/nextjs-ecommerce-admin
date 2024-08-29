import prismadb from "@/lib/prismadb"

export default async function DashboardPage({
  params: { storeId },
}: {
  params: { storeId: string }
}) {
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
    },
  })

  return (
    <div>
      <p>Store id: {store?.name}</p>
    </div>
  )
}
