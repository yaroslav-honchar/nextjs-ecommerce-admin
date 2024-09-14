"use client"

import { PlusIcon } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/hooks/use-sidebar"
import { cn } from "@/lib/utils"
import type { StoreIdParamType } from "@/types/pages-params.type"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import type { INavigationRoute } from "./navigation-route.type"
import { getNavigationRoutes } from "./navigation.routes"

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const { isOpen, onClose } = useSidebar()

  const pathname = usePathname()
  const params = useParams<StoreIdParamType>()

  const routes: INavigationRoute[] = getNavigationRoutes(params.storeId)

  const onLinkClickHandle = () => {
    if (isOpen && window.innerWidth <= 1024) {
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
    >
      <nav className={cn("py-6 px-4 size-full min-h-fit h-full overflow-auto")}>
        <ul className={"flex flex-col items-start gap-3"}>
          {routes.map(({ href, label, hrefAddNew }: INavigationRoute) => {
            return (
              <li
                key={href}
                className={"flex items-center gap-2 w-full h-8"}
              >
                <Link
                  className={cn(
                    "text-md font-medium transition-colors hover:text-primary w-full flex-grow",
                    pathname === `/${href}` ? "text-black dark:text-white" : "text-muted-foreground",
                  )}
                  href={href}
                  onClick={onLinkClickHandle}
                >
                  {label}
                </Link>
                {hrefAddNew && (
                  <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    className={"size-8 min-w-8 text-muted-foreground hover:text-primary"}
                  >
                    <Link
                      href={hrefAddNew}
                      onClick={onLinkClickHandle}
                    >
                      <PlusIcon size={20} />
                    </Link>
                  </Button>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
