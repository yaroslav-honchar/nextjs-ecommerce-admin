"use client"

import { PlusIcon } from "lucide-react"
import React from "react"
import { ApiList } from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ClientRoutes } from "@/routes/client.routes"
import type { StoreIdParamType } from "@/types/pages-params.type"
import { useParams, useRouter } from "next/navigation"
import { columns } from "./columns"
import type { IDashboardProps } from "./dashboard.props"

export const Dashboard: React.FC<IDashboardProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams<StoreIdParamType>()

  const onAddNew = (): void => {
    router.push(ClientRoutes.sizeEdit(params.storeId))
  }

  return (
    <>
      <div className={"flex items-start sm:justify-between flex-col gap-3 sm:flex-row"}>
        <Heading
          title={`Sizes (${data.length})`}
          description={"Manage sizes for your store"}
        />
        <Button
          className={"gap-2"}
          onClick={onAddNew}
        >
          <PlusIcon className={"w-4 h-4"} />
          Add new
        </Button>
      </div>
      <Separator className={"my-5"} />
      <DataTable
        columns={columns}
        data={data}
        hasPagination={true}
        searchKey={"name"}
      />
      <Heading
        title={"API"}
        description={"API documentation for sizes"}
      />
      <Separator className={"my-5"} />
      <ApiList
        entityName={"sizes"}
        entityIdName={"sizeId"}
      />
    </>
  )
}
