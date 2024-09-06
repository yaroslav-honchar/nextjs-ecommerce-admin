"use client"

import { PanelLeft } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/hooks/use-sidebar"

export const SidebarToggler: React.FC = () => {
  const { onToggle } = useSidebar()

  return (
    <Button
      className={"size-9"}
      size={"icon"}
      variant={"ghost"}
      onClick={onToggle}
    >
      <PanelLeft size={20} />
    </Button>
  )
}
