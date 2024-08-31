export const ClientRoutes = {
  home: "/",
  login: "/sign-in",
  register: "/sign-up",
  overview: (storeId: string): string => `/${storeId}`,
  settings: (storeId: string): string => `/${storeId}/settings`,
  billboards: (storeId: string): string => `/${storeId}/billboards`,
  billboard: (storeId: string, billboardId: string): string =>
    `/${storeId}/billboards/${billboardId}`,
  billboardEdit: (storeId: string): string => `/${storeId}/billboards/new`,
  categories: (storeId: string): string => `/${storeId}/categories`,
}
