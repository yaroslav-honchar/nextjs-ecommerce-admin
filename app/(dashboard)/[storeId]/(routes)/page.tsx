import type { IPropsWithStoreidParamAndStore } from "@/types/props-with-storeid-param-and-store.interface"

import { withStoreId } from "@/hocs/with-store-id"

const DashboardPage = ({ store }: Readonly<IPropsWithStoreidParamAndStore>) => (
  <div>Here is overview. Store name is: {store.name}</div>
)
export default withStoreId(DashboardPage)
