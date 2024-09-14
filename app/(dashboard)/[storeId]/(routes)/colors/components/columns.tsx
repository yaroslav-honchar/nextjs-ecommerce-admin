"use client"

import type { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { CellTableAction } from "@/components/cell-action/cell-action"
import { ColorViewer } from "@/components/color-viewer/color-viewer"
import { TableSortButton } from "@/components/ui/table-sort-button"
import { deleteColor } from "@/services/colors.service"
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
    cell: ({ row }) => {
      return (
        <div className={"flex gap-2 items-center"}>
          <ColorViewer
            value={row.original.value}
            size={"sm"}
          />
          {row.original.value}
        </div>
      )
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
        editPathKey={"colorEdit"}
        data={row.original}
        deleteHandle={deleteColor}
      />
    ),
  },
]
