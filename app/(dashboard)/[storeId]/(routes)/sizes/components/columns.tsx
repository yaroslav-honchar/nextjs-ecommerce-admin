"use client"

import type { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { CellTableAction } from "@/components/cell-action/cell-action"
import { TableSortButton } from "@/components/ui/table-sort-button"
import { deleteSize } from "@/services/sizes.service"
import type { ColumnType } from "./column.type"

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <TableSortButton column={column}>Name</TableSortButton>
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return <TableSortButton column={column}>Value</TableSortButton>
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
        editPathKey={"sizeEdit"}
        data={row.original}
        deleteHandle={deleteSize}
      />
    ),
  },
]
