export const ClientRoutes = {
  home: "/",
  login: "/sign-in",
  register: "/sign-up",
  overview: (storeId: string): string => `/${storeId}`,
  billboards: (storeId: string): string => `/${storeId}/billboards`,
  billboardEdit: (storeId: string, billboardId: string = "new"): string => `/${storeId}/billboards/${billboardId}`,
  categories: (storeId: string): string => `/${storeId}/categories`,
  categoryEdit: (storeId: string, categoryId: string = "new"): string => `/${storeId}/categories/${categoryId}`,
  sizes: (storeId: string): string => `/${storeId}/sizes`,
  sizeEdit: (storeId: string, sizeId: string = "new"): string => `/${storeId}/sizes/${sizeId}`,
  colors: (storeId: string): string => `/${storeId}/colors`,
  colorEdit: (storeId: string, colorId: string = "new"): string => `/${storeId}/colors/${colorId}`,
  products: (storeId: string): string => `/${storeId}/products`,
  productEdit: (storeId: string, productId: string = "new"): string => `/${storeId}/products/${productId}`,
  orders: (storeId: string): string => `/${storeId}/orders`,
  settings: (storeId: string): string => `/${storeId}/settings`,
}
