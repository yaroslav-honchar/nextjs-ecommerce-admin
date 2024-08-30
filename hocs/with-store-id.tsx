import { ObjectId } from "bson"

import type { ComponentType } from "react"
import React from "react"

import { ErrorDisplay } from "@/components/ui/ErrorDisplay"
import prismadb from "@/lib/prismadb"
import type { IPropsWithStoreidParam } from "@/types/props-with-storeid-param.interface"
import { auth } from "@clerk/nextjs/server"
import type { Store } from "@prisma/client"
import { redirect } from "next/navigation"

export function withStoreId<P extends object>(Component: ComponentType<P & { store: Store }>) {
  return async function WithStoreComponent(props: IPropsWithStoreidParam) {
    const {
      params: { storeId },
    } = props

    if (!ObjectId.isValid(storeId)) {
      redirect("/")
    }

    const { userId } = auth()

    if (!userId) {
      redirect("/sign-in")
    }

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
        <Component
          {...(props as P)}
          store={store}
        />
      )
    } catch (error) {
      console.error("Failed to fetch store data:", error)
      return <ErrorDisplay />
    }
  }
}
