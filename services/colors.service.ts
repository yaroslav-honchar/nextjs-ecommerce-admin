import type { AxiosRequestConfig } from "axios"
import { ApiRoutes } from "@/routes/api.routes"
import type { ColorSchemaType } from "@/schemas/color.schema"
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
  data: ColorSchemaType,
  config: AxiosRequestConfig = {},
): Promise<Color> => {
  const response = await coreService.post<Color>(ApiRoutes.colors(storeId), data, config)
  return response.data
}

export const updateColor = async (
  storeId: string,
  colorId: string,
  data: ColorSchemaType,
  config: AxiosRequestConfig = {},
): Promise<Color> => {
  const response = await coreService.patch<Color>(ApiRoutes.color(storeId, colorId), data, config)
  return response.data
}

export const deleteColor = async (storeId: string, colorId: string, config: AxiosRequestConfig = {}): Promise<void> => {
  await coreService.delete(ApiRoutes.color(storeId, colorId), config)
}
