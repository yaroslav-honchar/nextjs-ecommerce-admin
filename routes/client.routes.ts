export const ClientRoutes = {
  home: "/",
  login: "/sign-in",
  register: "/sign-up",
  overview: (storeId: string): string => `${storeId}`,
  settings: (storeId: string): string => `${storeId}/settings`,
}
