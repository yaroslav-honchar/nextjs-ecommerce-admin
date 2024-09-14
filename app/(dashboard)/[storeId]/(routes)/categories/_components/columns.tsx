"use client"

import React from "react"
import { CellTableAction } from "@/components/cell-action/cell-action"
import { TableSortButton } from "@/components/ui/table-sort-button"
import { deleteCategory } from "@/services/categories.service"
import type { ColumnDef } from "@tanstack/react-table"
import type { ColumnType } from "./column.type"

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <TableSortButton column={column}>Name</TableSortButton>
    },
  },
  {
    accessorKey: "billboardLabel",
    header: ({ column }) => {
      return <TableSortButton column={column}>Billboard</TableSortButton>
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
        editPathKey={"categoryEdit"}
        data={row.original}
        deleteHandle={deleteCategory}
      />
    ),
  },
]
