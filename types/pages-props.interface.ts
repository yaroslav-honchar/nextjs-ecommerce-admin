import type {
  StoreIdBillboardIdParamType,
  StoreIdCategoryIdParamType,
  StoreIdParamType,
} from "@/types/pages-params.type"
import type { Store } from "@prisma/client"

export interface IPropsWithStoreidParam {
  params: StoreIdParamType
}

export interface IPropsWithStoreidParamAndStore {
  store: Store
  params: StoreIdParamType
}

export interface IPropsWithStoreidBillboardidParam {
  params: StoreIdBillboardIdParamType
}

export interface IPropsWithStoreidCategoryidParam {
  params: StoreIdCategoryIdParamType
}
