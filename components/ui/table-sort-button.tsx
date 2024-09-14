"use client"

import { ArrowUpDown } from "lucide-react"
import type { PropsWithChildren } from "react"
import React from "react"
import { Button } from "@/components/ui/button"
import type { Column } from "@tanstack/react-table"

export function TableSortButton<T>({
  column,
  children,
}: PropsWithChildren<{
  column: Column<T, unknown>
}>) {
  return (
    <Button
      className={"gap-2 items-center px-0 hover:bg-transparent"}
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <ArrowUpDown className="h-4 w-4" />
      {children}
    </Button>
  )
}
