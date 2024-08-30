"use client"

import { PlusIcon } from "lucide-react"

import React from "react"

import type { StoreIdParamType } from "@/types/pages-params.type"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { ClientRoutes } from "@/routes/client.routes"

import { useParams, useRouter } from "next/navigation"

export const BillboardClient: React.FC = () => {
  const router = useRouter()
  const params = useParams<StoreIdParamType>()

  const onAddNew = (): void => {
    router.push(ClientRoutes.billboardsNew(params.storeId))
  }

  return (
    <>
      <div className={"flex items-start justify-between"}>
        <Heading
          title={"Billboards (0)"}
          description={"Manage billboards for your store"}
        />
        <Button
          className={"gap-2"}
          onClick={onAddNew}
        >
          <PlusIcon width={"w-4 h-4"} />
          Add new
        </Button>
      </div>
      <Separator className={"my-5"} />
    </>
  )
}
