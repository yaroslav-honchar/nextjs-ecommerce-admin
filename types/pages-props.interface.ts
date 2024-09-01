import type {
  StoreIdBillboardIdParamType,
  StoreIdCategoryIdParamType,
  StoreIdColorIdParamType,
  StoreIdParamType,
  StoreIdProductIdParamType,
  StoreIdSizeIdParamType,
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

export interface IPropsWithStoreidSizeidParam {
  params: StoreIdSizeIdParamType
}

export interface IPropsWithStoreidColoridParam {
  params: StoreIdColorIdParamType
}

export interface IPropsWithStoreidProductidParam {
  params: StoreIdProductIdParamType
}
