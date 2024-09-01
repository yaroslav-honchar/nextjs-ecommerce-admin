"use client"

import type { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { CellTableAction } from "@/components/cell-action/cell-action"
import { TableSortButton } from "@/components/ui/table-sort-button"
import { deleteBillboard } from "@/services/billboards.service"
import type { ColumnType } from "./column.type"

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return <TableSortButton column={column}>Label</TableSortButton>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <TableSortButton column={column}>Date</TableSortButton>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <CellTableAction
        editPathKey={"billboardEdit"}
        data={row.original}
        deleteHandle={deleteBillboard}
      />
    ),
  },
]
