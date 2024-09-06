import type { AxiosRequestConfig } from "axios"
import type { ColorDataType } from "@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/components/form.schema"
import { ApiRoutes } from "@/routes/api.routes"
import { coreService } from "@/services/core.service"
import type { Color } from "@prisma/client"

export const getColors = async (storeId: string, config: AxiosRequestConfig = {}): Promise<Color[]> => {
  const response = await coreService.get<Color[]>(ApiRoutes.colors(storeId), config)
  return response.data
}

export const getColor = async (storeId: string, colorId: string, config: AxiosRequestConfig = {}): Promise<Color> => {
  const response = await coreService.get<Color>(ApiRoutes.color(storeId, colorId), config)
  return response.data
}

export const createColor = async (
  storeId: string,
  data: ColorDataType,
  config: AxiosRequestConfig = {},
): Promise<Color> => {
  const response = await coreService.post<Color>(ApiRoutes.colors(storeId), data, config)
  return response.data
}

export const updateColor = async (
  storeId: string,
  colorId: string,
  data: ColorDataType,
  config: AxiosRequestConfig = {},
): Promise<Color> => {
  const response = await coreService.patch<Color>(ApiRoutes.color(storeId, colorId), data, config)
  return response.data
}

export const deleteColor = async (storeId: string, colorId: string, config: AxiosRequestConfig = {}): Promise<void> => {
  await coreService.delete(ApiRoutes.color(storeId, colorId), config)
}
