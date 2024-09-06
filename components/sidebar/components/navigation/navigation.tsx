"use client"

import type { HTMLAttributes } from "react"
import React from "react"
import type { StoreIdParamType } from "@/types/pages-params.type"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import type { INavigationRoute } from "./navigation-route.type"
import { getNavigationRoutes } from "./navigation.routes"

export const Navigation: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  const pathname = usePathname()
  const params = useParams<StoreIdParamType>()

  const routes: INavigationRoute[] = getNavigationRoutes(params.storeId)

  return (
    <nav
      className={cn(className)}
      {...rest}
    >
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
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
