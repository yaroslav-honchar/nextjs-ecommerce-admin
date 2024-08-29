import { ObjectId } from "bson"

import type { PropsWithChildren } from "react"

import { Header } from "@/components/header"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
  params: { storeId },
}: Readonly<PropsWithChildren & { params: { storeId: string } }>) {
  if (!ObjectId.isValid(storeId)) {
    redirect("/")
  }

  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

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
    <>
      <Header />
      {children}
    </>
  )
}
