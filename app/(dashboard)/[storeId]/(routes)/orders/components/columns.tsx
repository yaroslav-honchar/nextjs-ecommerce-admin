"use client"

import type { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { TableSortButton } from "@/components/ui/table-sort-button"
import type { ColumnType } from "./column.type"

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "isPaid",
    header: ({ column }) => {
      return <TableSortButton column={column}>Paid</TableSortButton>
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return <TableSortButton column={column}>Phone</TableSortButton>
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return <TableSortButton column={column}>Address</TableSortButton>
    },
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <TableSortButton column={column}>Date</TableSortButton>
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return <TableSortButton column={column}>Total price</TableSortButton>
    },
  },
]
