"use client"

import type { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { TableSortButton } from "@/components/ui/table-sort-button"
import { CellAction } from "./cell-action"
import type { CategoryColumnType } from "./column.type"

export const columns: ColumnDef<CategoryColumnType>[] = [
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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
