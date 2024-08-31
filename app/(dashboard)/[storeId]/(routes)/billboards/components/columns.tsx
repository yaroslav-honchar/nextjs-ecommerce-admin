"use client"

import type { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { TableSortButton } from "@/components/ui/table-sort-button"
import { CellAction } from "./cell-action"
import type { BillboardColumnType } from "./column.type"

export const columns: ColumnDef<BillboardColumnType>[] = [
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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
