const root = "/api"

export const ApiRoutes = {
  stores: `${root}/stores`,
  store: (storeId: string): string => `${root}/stores/${storeId}`,
}
