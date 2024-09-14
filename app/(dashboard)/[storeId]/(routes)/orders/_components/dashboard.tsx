import React from "react"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { columns } from "./columns"
import type { IDashboardProps } from "./dashboard.props"

export const Dashboard: React.FC<IDashboardProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description={"Date of orders in your store"}
      />
      <Separator className={"my-5"} />
      <DataTable
        columns={columns}
        data={data}
        hasPagination={true}
        searchKey={"products"}
      />
    </>
  )
}
