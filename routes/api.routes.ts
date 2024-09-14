const root = "/api"

export const ApiRoutes = {
  stores: `${root}/stores`,
  store: (storeId: string): string => `${root}/stores/${storeId}`,
  billboards: (storeId: string): string => `${root}/${storeId}/billboards`,
  billboard: (storeId: string, billboardId: string): string => `${root}/${storeId}/billboards/${billboardId}`,
  categories: (storeId: string): string => `${root}/${storeId}/categories`,
  category: (storeId: string, categoryId: string): string => `${root}/${storeId}/categories/${categoryId}`,
  subCategories: (storeId: string): string => `${root}/${storeId}/sub-categories`,
  subCategory: (storeId: string, subCategoryId: string): string => `${root}/${storeId}/sub-categories/${subCategoryId}`,
  sizes: (storeId: string): string => `${root}/${storeId}/sizes`,
  size: (storeId: string, sizeId: string): string => `${root}/${storeId}/sizes/${sizeId}`,
  colors: (storeId: string): string => `${root}/${storeId}/colors`,
  color: (storeId: string, colorId: string): string => `${root}/${storeId}/colors/${colorId}`,
  products: (storeId: string): string => `${root}/${storeId}/products`,
  product: (storeId: string, productId: string): string => `${root}/${storeId}/products/${productId}`,
}
