import React from "react"

import prismadb from "@/lib/prismadb"

import { Navigation } from "./components/navigation"
import { StoreSwitcher } from "./components/store-switcher"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const Header: React.FC = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  })

  return (
    <header className={"flex items-center gap-6 px-4 py-6 border-b"}>
      <StoreSwitcher items={stores} />
      <Navigation />
      <div className={"flex items-center gap-4 ms-auto"}>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
