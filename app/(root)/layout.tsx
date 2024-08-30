import type { PropsWithChildren } from "react"

import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const SetupLayout = async ({ children }: Readonly<PropsWithChildren>) => {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const store = await prismadb.store.findFirst({
    where: { userId },
  })

  if (store) {
    redirect(`/${store.id}`)
  }

  return children
}

export default SetupLayout
