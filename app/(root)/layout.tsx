import type { PropsWithChildren } from "react"
import React from "react"

import { ErrorDisplay } from "@/components/ui/ErrorDisplay"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const SetupLayout = async ({ children }: Readonly<PropsWithChildren>) => {
  try {
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
  } catch (error) {
    console.log(error)
    return <ErrorDisplay />
  }
}

export default SetupLayout
