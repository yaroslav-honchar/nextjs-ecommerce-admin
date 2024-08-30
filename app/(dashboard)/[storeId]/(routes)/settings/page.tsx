import { SettingsForm } from "./components/settings-form"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function SettingsPage({
  params: { storeId },
}: {
  params: { storeId: string }
}) {
  const { userId } = auth() as { userId: string }

  try {
    const store = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    })
    if (!store) {
      redirect("/")
    }

    return (
      <div className={"flex-grow lg:p-8 p-4"}>
        <SettingsForm initialData={store} />
      </div>
    )
  } catch (error) {
    console.log(error)
    return (
      <div className={"flex-grow lg:p-8 p-4 flex flex-col items-center justify-center"}>
        <div>Something went wrong</div>
      </div>
    )
  }
}
