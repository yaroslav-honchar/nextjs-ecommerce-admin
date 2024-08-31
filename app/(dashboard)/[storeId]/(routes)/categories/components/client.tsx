"use client"

import { PlusIcon } from "lucide-react"
import React from "react"
import type { StoreIdParamType } from "@/types/pages-params.type"
import { ApiList } from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ClientRoutes } from "@/routes/client.routes"
import { useParams, useRouter } from "next/navigation"
import type { ICategoryClientProps } from "./client.props"
import { columns } from "./columns"

export const CategoryClient: React.FC<ICategoryClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams<StoreIdParamType>()

  const onAddNew = (): void => {
    router.push(ClientRoutes.categoryEdit(params.storeId))
  }

  return (
    <>
      <div className={"flex items-start justify-between"}>
        <Heading
          title={`Categories (${data.length})`}
          description={"Manage categories for your store"}
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
        description={"API documentation for categories"}
      />
      <Separator className={"my-5"} />
      <ApiList
        entityName={"categories"}
        entityIdName={"categoryId"}
      />
    </>
  )
}
