"use client"

import type { HTMLAttributes } from "react"
import React from "react"

import { cn } from "@/lib/utils"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

interface INavigationRoute {
  label: string
  href: string
  active: boolean
}

export const Navigation: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  const pathname = usePathname()
  const params = useParams<{ storeId: string }>()

  const routes: INavigationRoute[] = [
    {
      label: "Overview",
      href: `/${params.storeId}`,
      active: pathname === `/${params.storeId}`,
    },
    {
      label: "Settings",
      href: `/${params.storeId}/settings`,
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <nav
      className={cn(className)}
      {...rest}
    >
      <ul className={"flex items-center gap-5"}>
        {routes.map(({ href, label }: INavigationRoute) => (
          <li key={href}>
            <Link
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === href ? "text-black dark:text-white" : "text-muted-foreground",
              )}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
