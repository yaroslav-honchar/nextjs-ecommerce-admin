"use client"

import type { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { TableSortButton } from "@/components/ui/table-sort-button"
import { CellAction } from "./cell-action"
import type { SizeColumnType } from "./column.type"

export const columns: ColumnDef<SizeColumnType>[] = [
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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
