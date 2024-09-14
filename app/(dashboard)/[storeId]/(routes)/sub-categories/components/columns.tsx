"use client"

import type { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { CellTableAction } from "@/components/cell-action/cell-action"
import { TableSortButton } from "@/components/ui/table-sort-button"
import { deleteSubCategory } from "@/services/sub-categories.service"
import type { ColumnType } from "./column.type"

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <TableSortButton column={column}>Name</TableSortButton>
    },
  },
  {
    accessorKey: "categoryLabel",
    header: ({ column }) => {
      return <TableSortButton column={column}>Category</TableSortButton>
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
        editPathKey={"subCategoryEdit"}
        data={row.original}
        deleteHandle={deleteSubCategory}
      />
    ),
  },
]
