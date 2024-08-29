import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"

export default async function SettingsPage({
  params: { storeId },
}: {
  params: { storeId: string }
}) {
  const { userId } = auth() as { userId: string }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  })

  return (
    <div>
      <p>Settings page</p>
      <p>Store id: {store?.name}</p>
    </div>
  )
}
