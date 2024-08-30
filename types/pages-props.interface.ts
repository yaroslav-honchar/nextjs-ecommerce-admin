import type { StoreIdParamType } from "@/types/pages-params.type"

import type { Store } from "@prisma/client"

export interface IPropsWithStoreidParam {
  params: StoreIdParamType
}

export interface IPropsWithStoreidParamAndStore {
  store: Store
  params: StoreIdParamType
}
