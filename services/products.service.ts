import type { AxiosRequestConfig } from "axios"
import { ApiRoutes } from "@/routes/api.routes"
import { coreService } from "@/services/core.service"
import type { ProductDataType } from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/form.schema"
import type { Product } from "@prisma/client"

export const getProducts = async (storeId: string, config: AxiosRequestConfig = {}): Promise<Product[]> => {
  const response = await coreService.get<Product[]>(ApiRoutes.products(storeId), config)
  return response.data
}

export const getProduct = async (
  storeId: string,
  productId: string,
  config: AxiosRequestConfig = {},
): Promise<Product> => {
  const response = await coreService.get<Product>(ApiRoutes.product(storeId, productId), config)
  return response.data
}

export const createProduct = async (
  storeId: string,
  data: ProductDataType,
  config: AxiosRequestConfig = {},
): Promise<Product> => {
  const response = await coreService.post<Product>(ApiRoutes.products(storeId), data, config)
  return response.data
}

export const updateProduct = async (
  storeId: string,
  productId: string,
  data: ProductDataType,
  config: AxiosRequestConfig = {},
): Promise<Product> => {
  const response = await coreService.patch<Product>(ApiRoutes.product(storeId, productId), data, config)
  return response.data
}

export const deleteProduct = async (
  storeId: string,
  productId: string,
  config: AxiosRequestConfig = {},
): Promise<void> => {
  await coreService.delete(ApiRoutes.product(storeId, productId), config)
}
