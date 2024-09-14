import type { AxiosRequestConfig } from "axios"
import type { SubCategoryDataType } from "@/app/(dashboard)/[storeId]/(routes)/sub-categories/[subCategoryId]/_components/form.schema"
import { ApiRoutes } from "@/routes/api.routes"
import { coreService } from "@/services/core.service"
import type { SubCategory } from "@prisma/client"

export const getSubCategories = async (storeId: string, config: AxiosRequestConfig = {}): Promise<SubCategory[]> => {
  const response = await coreService.get<SubCategory[]>(ApiRoutes.subCategories(storeId), config)
  return response.data
}

export const getSubCategory = async (
  storeId: string,
  subCategoryId: string,
  config: AxiosRequestConfig = {},
): Promise<SubCategory> => {
  const response = await coreService.get<SubCategory>(ApiRoutes.subCategory(storeId, subCategoryId), config)
  return response.data
}

export const createSubCategory = async (
  storeId: string,
  data: SubCategoryDataType,
  config: AxiosRequestConfig = {},
): Promise<SubCategory> => {
  const response = await coreService.post<SubCategory>(ApiRoutes.subCategories(storeId), data, config)
  return response.data
}

export const updateSubCategory = async (
  storeId: string,
  subCategoryId: string,
  data: SubCategoryDataType,
  config: AxiosRequestConfig = {},
): Promise<SubCategory> => {
  const response = await coreService.patch<SubCategory>(ApiRoutes.subCategory(storeId, subCategoryId), data, config)
  return response.data
}

export const deleteSubCategory = async (
  storeId: string,
  subCategoryId: string,
  config: AxiosRequestConfig = {},
): Promise<void> => {
  await coreService.delete(ApiRoutes.subCategory(storeId, subCategoryId), config)
}
