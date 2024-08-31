import type { AxiosRequestConfig } from "axios"
import { ApiRoutes } from "@/routes/api.routes"
import { coreService } from "@/services/core.service"
import type { Category } from "@prisma/client"

export const getCategories = async (storeId: string, config: AxiosRequestConfig = {}): Promise<Category[]> => {
  const response = await coreService.get<Category[]>(ApiRoutes.categories(storeId), config)
  return response.data
}

export const getCategory = async (
  storeId: string,
  categoryId: string,
  config: AxiosRequestConfig = {},
): Promise<Category> => {
  const response = await coreService.get<Category>(ApiRoutes.category(storeId, categoryId), config)
  return response.data
}

export const createCategory = async (
  storeId: string,
  data: { name: string; billboardId: string },
  config: AxiosRequestConfig = {},
): Promise<Category> => {
  const response = await coreService.post<Category>(ApiRoutes.categories(storeId), data, config)
  return response.data
}

export const updateCategory = async (
  storeId: string,
  categoryId: string,
  data: { name: string; billboardId: string },
  config: AxiosRequestConfig = {},
): Promise<Category> => {
  const response = await coreService.patch<Category>(ApiRoutes.category(storeId, categoryId), data, config)
  return response.data
}

export const deleteCategory = async (
  storeId: string,
  categoryId: string,
  config: AxiosRequestConfig = {},
): Promise<void> => {
  await coreService.delete(ApiRoutes.category(storeId, categoryId), config)
}
