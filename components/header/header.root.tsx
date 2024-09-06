import React from "react"
import { SidebarToggler } from "./components/sidebar-toggler/sidebar-toggler"
import { StoreSwitcher } from "./components/store-switcher/store-switcher"
import { ThemeSelect } from "@/components/theme-select/theme-select"
import prismadb from "@/lib/prismadb"
import { cn } from "@/lib/utils"
import { ClientRoutes } from "@/routes/client.routes"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { HeaderClient } from "./header.client"

export const Header: React.FC<{ className?: string }> = async ({ className }) => {
  const { userId } = auth()

  if (!userId) {
    redirect(ClientRoutes.login)
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  })

  return (
    <HeaderClient className={cn("flex items-center gap-6 px-4 py-2 border-b w-full bg-background", className)}>
      <SidebarToggler />
      <StoreSwitcher items={stores} />
      <div className={"flex items-center gap-4 ms-auto"}>
        <ThemeSelect />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </HeaderClient>
  )
}
