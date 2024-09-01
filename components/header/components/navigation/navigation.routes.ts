import { ClientRoutes } from "@/routes/client.routes"
import type { INavigationRoute } from "./navigation-route.type"

export const getNavigationRoutes = (storeId: string): INavigationRoute[] => {
  return [
    {
      label: "Overview",
      href: ClientRoutes.overview(storeId),
    },
    {
      label: "Billboards",
      href: ClientRoutes.billboards(storeId),
    },
    {
      label: "Categories",
      href: ClientRoutes.categories(storeId),
    },
    {
      label: "Sizes",
      href: ClientRoutes.sizes(storeId),
    },
    {
      label: "Colors",
      href: ClientRoutes.colors(storeId),
    },
    {
      label: "Settings",
      href: ClientRoutes.settings(storeId),
    },
  ]
}
