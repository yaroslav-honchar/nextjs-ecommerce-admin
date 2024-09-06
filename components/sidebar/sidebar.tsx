import React from "react"
import { cn } from "@/lib/utils"
import { Navigation } from "./components/navigation/navigation"

export const Sidebar: React.FC<{ className: string }> = ({ className }) => {
  return (
    <aside className={cn(" border-e h-full overflow-hidden", className)}>
      <Navigation className={"py-6 px-4 w-full min-h-fit max-h-full overflow-auto"} />
    </aside>
  )
}
