"use client"

import type { PropsWithChildren } from "react"
import React, { useEffect, useRef } from "react"

export const HeaderClient: React.FC<PropsWithChildren<{ className: string }>> = async ({ className, children }) => {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headerEl = headerRef.current
    if (!headerEl || typeof document === "undefined") {
      return
    }

    document.documentElement.style.setProperty("--header-height", `${headerEl.clientHeight}px`)
  }, [])

  return (
    <header
      ref={headerRef}
      className={className}
    >
      {children}
    </header>
  )
}
