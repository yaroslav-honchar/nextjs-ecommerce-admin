import type { AxiosRequestConfig } from "axios"

import { ApiRoutes } from "@/routes/api.routes"

import { coreService } from "@/services/core.service"

import type { Billboard } from "@prisma/client"

export const createBillboard = async (
  storeId: string,
  data: { label: string; imageUrl: string },
  config: AxiosRequestConfig = {},
): Promise<Billboard> => {
  const response = await coreService.post<Billboard>(ApiRoutes.billboards(storeId), data, config)
  return response.data
}

export const updateBillboard = async (
  storeId: string,
  billboardId: string,
  data: { label: string; imageUrl: string },
  config: AxiosRequestConfig = {},
): Promise<Billboard> => {
  const response = await coreService.patch<Billboard>(
    ApiRoutes.billboard(storeId, billboardId),
    data,
    config,
  )
  return response.data
}

export const deleteBillboard = async (
  storeId: string,
  billboardId: string,
  config: AxiosRequestConfig = {},
): Promise<void> => {
  await coreService.delete(ApiRoutes.billboard(storeId, billboardId), config)
}
