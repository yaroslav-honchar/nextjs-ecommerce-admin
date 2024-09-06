"use client"

import React from "react"
import type { INavigationRoute } from "@/components/sidebar/navigation-route.type"
import { getNavigationRoutes } from "@/components/sidebar/navigation.routes"
import { useSidebar } from "@/hooks/use-sidebar"
import { cn } from "@/lib/utils"
import type { StoreIdParamType } from "@/types/pages-params.type"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const { isOpen, onClose } = useSidebar()

  const pathname = usePathname()
  const params = useParams<StoreIdParamType>()

  const routes: INavigationRoute[] = getNavigationRoutes(params.storeId)

  const asideCloseOutside = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget && window.innerWidth <= 1024) {
      onClose()
    }
  }

  return (
    <aside
      className={cn(
        "border-e lg:h-full w-[240px] h-[calc(100vh-var(--header-height))] overflow-hidden transition-all duration-300 bg-background",
        "fixed top-[var(--header-height)] left-0 z-50",
        isOpen ? "translate-x-0" : "translate-x-[-100%]",
        className,
      )}
      onClick={asideCloseOutside}
    >
      <nav className={cn("py-6 px-4 size-full min-h-fit h-full overflow-auto")}>
        <ul className={"flex flex-col items-start gap-3"}>
          {routes.map(({ href, label }: INavigationRoute) => {
            return (
              <li key={href}>
                <Link
                  className={cn(
                    "text-md font-medium transition-colors hover:text-primary",
                    pathname === `/${href}` ? "text-black dark:text-white" : "text-muted-foreground",
                  )}
                  href={href}
                  onClick={onClose}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
