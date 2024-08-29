import React from "react"

import { Navigation } from "./components/navigation"
import { StoreSwitcher } from "./components/store-switcher"
import { Button } from "@/components/ui/button"
import prismadb from "@/lib/prismadb"
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs"
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
    <header className={"flex items-center px-4 py-6"}>
      <StoreSwitcher items={stores} />
      <Navigation className={"mx-auto"} />
      <div className={"flex items-center gap-4"}>
        <SignedIn>
          <UserButton />
          <SignOutButton>
            <Button>Sign Out</Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </header>
  )
}
