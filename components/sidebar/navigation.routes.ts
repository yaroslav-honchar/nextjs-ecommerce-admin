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
      hrefAddNew: ClientRoutes.billboardEdit(storeId),
    },
    {
      label: "Categories",
      href: ClientRoutes.categories(storeId),
      hrefAddNew: ClientRoutes.categoryEdit(storeId),
    },
    {
      label: "Sub categories",
      href: ClientRoutes.subCategories(storeId),
      hrefAddNew: ClientRoutes.subCategoryEdit(storeId),
    },
    {
      label: "Products",
      href: ClientRoutes.products(storeId),
      hrefAddNew: ClientRoutes.productEdit(storeId),
    },
    {
      label: "Sizes",
      href: ClientRoutes.sizes(storeId),
      hrefAddNew: ClientRoutes.sizeEdit(storeId),
    },
    {
      label: "Colors",
      href: ClientRoutes.colors(storeId),
      hrefAddNew: ClientRoutes.colorEdit(storeId),
    },
    {
      label: "Orders",
      href: ClientRoutes.orders(storeId),
    },
    {
      label: "Settings",
      href: ClientRoutes.settings(storeId),
    },
  ]
}
