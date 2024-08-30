import { ClientRoutes } from "@/routes/client.routes"

import type { INavigationRoute } from "./navigation-route.type"

export const getNavigationRoutes = (storeId: string, pathname: string): INavigationRoute[] => {
  return [
    {
      label: "Overview",
      href: ClientRoutes.overview(storeId),
      active: pathname === ClientRoutes.overview(storeId),
    },
    {
      label: "Billboards",
      href: ClientRoutes.billboards(storeId),
      active: pathname === ClientRoutes.billboards(storeId),
    },
    {
      label: "Settings",
      href: ClientRoutes.settings(storeId),
      active: pathname === ClientRoutes.settings(storeId),
    },
  ]
}
