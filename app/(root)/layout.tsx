import type { PropsWithChildren } from "react"

import { ErrorDisplay } from "@/components/ui/ErrorDisplay"

import prismadb from "@/lib/prismadb"

import { auth } from "@clerk/nextjs/server"
import type { Store } from "@prisma/client"
import { redirect } from "next/navigation"

const SetupLayout = async ({ children }: Readonly<PropsWithChildren>) => {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  let store: Store | null = null

  try {
    store = await prismadb.store.findFirst({
      where: { userId },
    })
  } catch (error) {
    console.log(error)
    return <ErrorDisplay />
  }

  if (store) {
    redirect(`/${store.id}`)
  }

  return children
}

export default SetupLayout
