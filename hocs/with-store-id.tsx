import { ObjectId } from "bson"
import type { ComponentType } from "react"
import React from "react"
import type { IPropsWithStoreidParam } from "@/types/pages-props.interface"
import { ErrorDisplay } from "@/components/ui/ErrorDisplay"
import { ClientRoutes } from "@/routes/client.routes"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import type { Store } from "@prisma/client"
import { redirect } from "next/navigation"

export function withStoreId<P extends object>(Component: ComponentType<P & { store: Store }>) {
  return async function WithStoreComponent(props: IPropsWithStoreidParam) {
    const {
      params: { storeId },
    } = props

    if (!ObjectId.isValid(storeId)) {
      redirect(ClientRoutes.home)
    }

    const { userId } = auth()

    if (!userId) {
      redirect(ClientRoutes.login)
    }

    let store: Store | null = null

    try {
      store = await prismadb.store.findFirst({
        where: {
          id: storeId,
          userId,
        },
      })
    } catch (error) {
      console.error("Failed to fetch store data from withStoreId hoc:", error)
      return <ErrorDisplay />
    }

    if (!store) {
      redirect(ClientRoutes.home)
    }

    return (
      <Component
        {...(props as P)}
        store={store}
      />
    )
  }
}
