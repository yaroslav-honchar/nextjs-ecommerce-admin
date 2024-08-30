import type { Store } from "@prisma/client"

export interface IPropsWithStoreidParamAndStore {
  store: Store
  params: {
    storeId: string
  }
}
