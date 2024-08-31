export const ClientRoutes = {
  home: "/",
  login: "/sign-in",
  register: "/sign-up",
  overview: (storeId: string): string => `/${storeId}`,
  settings: (storeId: string): string => `/${storeId}/settings`,
  billboards: (storeId: string): string => `/${storeId}/billboards`,
  billboardEdit: (storeId: string, billboardId: string = "new"): string =>
    `/${storeId}/billboards/${billboardId}`,
  categories: (storeId: string): string => `/${storeId}/categories`,
  categoryEdit: (storeId: string, categoryId: string = "new"): string =>
    `/${storeId}/categories/${categoryId}`,
}
