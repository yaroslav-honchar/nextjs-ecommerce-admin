import type { AxiosRequestConfig } from "axios"
import { ApiRoutes } from "@/routes/api.routes"
import type { BillboardSchemaType } from "@/schemas/billboard.schema"
import { coreService } from "@/services/core.service"
import type { Billboard } from "@prisma/client"

export const getBillboards = async (storeId: string, config: AxiosRequestConfig = {}): Promise<Billboard[]> => {
  const response = await coreService.get<Billboard[]>(ApiRoutes.billboards(storeId), config)
  return response.data
}

export const getBillboard = async (
  storeId: string,
  billboardId: string,
  config: AxiosRequestConfig = {},
): Promise<Billboard> => {
  const response = await coreService.get<Billboard>(ApiRoutes.billboard(storeId, billboardId), config)
  return response.data
}

export const createBillboard = async (
  storeId: string,
  data: BillboardSchemaType,
  config: AxiosRequestConfig = {},
): Promise<Billboard> => {
  const response = await coreService.post<Billboard>(ApiRoutes.billboards(storeId), data, config)
  return response.data
}

export const updateBillboard = async (
  storeId: string,
  billboardId: string,
  data: BillboardSchemaType,
  config: AxiosRequestConfig = {},
): Promise<Billboard> => {
  const response = await coreService.patch<Billboard>(ApiRoutes.billboard(storeId, billboardId), data, config)
  return response.data
}

export const deleteBillboard = async (
  storeId: string,
  billboardId: string,
  config: AxiosRequestConfig = {},
): Promise<void> => {
  await coreService.delete(ApiRoutes.billboard(storeId, billboardId), config)
}
