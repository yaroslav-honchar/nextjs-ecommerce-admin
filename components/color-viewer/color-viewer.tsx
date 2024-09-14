import React from "react"
import { cn } from "@/lib/utils"
import type { IColorViewerProps } from "./color-viewer.props"

export const ColorViewer: React.FC<IColorViewerProps> = ({ value, size = "md" }) => {
  return (
    <div
      className={cn(
        "rounded-full border-2",
        size === "xs" && "size-4 min-w-4 min-h-4",
        size === "sm" && "size-6 min-w-6 min-h-6",
        size === "md" && "size-10 min-w-10 min-h-10",
      )}
      style={{ backgroundColor: value || "" }}
    />
  )
}
