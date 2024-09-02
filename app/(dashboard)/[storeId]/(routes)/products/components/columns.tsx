"use client"

import type { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { CellTableAction } from "@/components/cell-action/cell-action"
import { TableSortButton } from "@/components/ui/table-sort-button"
import { deleteProduct } from "@/services/products.service"
import type { ColumnType } from "./column.type"

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <TableSortButton column={column}>Name</TableSortButton>
    },
  },
  {
    accessorKey: "isArchived",
    header: ({ column }) => {
      return <TableSortButton column={column}>Archived</TableSortButton>
    },
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => {
      return <TableSortButton column={column}>Featured</TableSortButton>
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <TableSortButton column={column}>Price</TableSortButton>
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <TableSortButton column={column}>Category</TableSortButton>
    },
    cell: ({ row }) => {
      return <span>{row.original.category.name}</span>
    },
  },
  {
    accessorKey: "color",
    header: ({ column }) => {
      return <TableSortButton column={column}>Color</TableSortButton>
    },
    cell: ({ row }) => {
      return (
        <div className={"flex gap-2 items-center"}>
          <div
            className={"w-4 h-4 rounded-full border-2"}
            style={{ backgroundColor: row.original.color.value }}
          />
          {row.original.color.value}
        </div>
      )
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => {
      return <TableSortButton column={column}>Size</TableSortButton>
    },
    cell: ({ row }) => {
      return <span>{row.original.size.value}</span>
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
        editPathKey={"productEdit"}
        data={row.original}
        deleteHandle={deleteProduct}
      />
    ),
  },
]
