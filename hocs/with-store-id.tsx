import { ObjectId } from "bson"

import type { ComponentType } from "react"
import React from "react"

import type { IPropsWithStoreidParam } from "@/types/props-with-storeid-param.interface"

import { ErrorDisplay } from "@/components/ui/ErrorDisplay"

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
      redirect("/")
    }

    const { userId } = auth()

    if (!userId) {
      redirect("/sign-in")
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
      redirect("/")
    }

    return (
      <Component
        {...(props as P)}
        store={store}
      />
    )
  }
}
