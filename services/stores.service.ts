import type { AxiosRequestConfig } from "axios"

import { ApiRoutes } from "@/routes/api.routes"

import { coreService } from "@/services/core.service"

import type { Store } from "@prisma/client"

export const createStore = async (
  data: { name: string },
  config: AxiosRequestConfig = {},
): Promise<Store> => {
  const response = await coreService.post<Store>(ApiRoutes.stores, data, config)
  return response.data
}

export const updateStore = async (
  storeId: string,
  data: { name: string },
  config: AxiosRequestConfig = {},
): Promise<Store> => {
  const response = await coreService.patch<Store>(ApiRoutes.store(storeId), data, config)
  return response.data
}

export const deleteStore = async (
  storeId: string,
  config: AxiosRequestConfig = {},
): Promise<void> => {
  await coreService.delete<Store>(ApiRoutes.store(storeId), config)
}
