"use client"

import { MailIcon, RefreshCwIcon } from "lucide-react"
import type { PropsWithChildren } from "react"
import React from "react"
import { Button } from "@/components/ui/button"

export const ErrorDisplay: React.FC<PropsWithChildren> = ({ children }) => {
  const onReload = () => (typeof window !== "undefined" ? window.location.reload() : null)

  return (
    <div className="flex-grow lg:p-8 p-4 flex gap-5 flex-col items-center justify-center">
      <div>{children ? children : <div>Something went wrong. Please try again later.</div>}</div>
      <div className="flex gap-4 items-center justify-center">
        <Button
          className={"gap-2"}
          variant={"outline"}
          onClick={onReload}
        >
          <RefreshCwIcon className={"w-4 h-4"} />
          Retry
        </Button>
        <Button asChild>
          <a
            className={"gap-2"}
            href="mailto:yaroslav.honchar.1@gmail.com"
          >
            <Button asChild />
            <MailIcon className={"w-4 h-4"} />
            Contact support
          </a>
        </Button>
      </div>
    </div>
  )
}
