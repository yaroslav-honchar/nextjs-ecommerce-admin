export const ClientRoutes = {
  home: "/",
  login: "/sign-in",
  register: "/sign-up",
  overview: (storeId: string): string => `/${storeId}`,
  settings: (storeId: string): string => `/${storeId}/settings`,
  billboards: (storeId: string): string => `/${storeId}/billboards`,
  billboardsNew: (storeId: string): string => `/${storeId}/billboards/new`,
}
