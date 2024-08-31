const root = "/api"

export const ApiRoutes = {
  stores: `${root}/stores`,
  store: (storeId: string): string => `${root}/stores/${storeId}`,
  billboards: (storeId: string): string => `${root}/${storeId}/billboards`,
  billboard: (storeId: string, billboardId: string): string =>
    `${root}/${storeId}/billboards/${billboardId}`,
}
