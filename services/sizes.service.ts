import type { AxiosRequestConfig } from "axios"
import { ApiRoutes } from "@/routes/api.routes"
import { coreService } from "@/services/core.service"
import type { Size } from "@prisma/client"

export const getSizes = async (storeId: string, config: AxiosRequestConfig = {}): Promise<Size[]> => {
  const response = await coreService.get<Size[]>(ApiRoutes.sizes(storeId), config)
  return response.data
}

export const getSize = async (storeId: string, sizeId: string, config: AxiosRequestConfig = {}): Promise<Size> => {
  const response = await coreService.get<Size>(ApiRoutes.size(storeId, sizeId), config)
  return response.data
}

export const createSize = async (
  storeId: string,
  data: { name: string; value: string },
  config: AxiosRequestConfig = {},
): Promise<Size> => {
  const response = await coreService.post<Size>(ApiRoutes.sizes(storeId), data, config)
  return response.data
}

export const updateSize = async (
  storeId: string,
  sizeId: string,
  data: { name: string; value: string },
  config: AxiosRequestConfig = {},
): Promise<Size> => {
  const response = await coreService.patch<Size>(ApiRoutes.size(storeId, sizeId), data, config)
  return response.data
}

export const deleteSize = async (
  storeId: string,
  categoryId: string,
  config: AxiosRequestConfig = {},
): Promise<void> => {
  await coreService.delete(ApiRoutes.size(storeId, categoryId), config)
}
