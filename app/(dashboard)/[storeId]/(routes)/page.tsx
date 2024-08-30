import { withStoreId } from "@/hocs/with-store-id"
import type { IPropsWithStoreidParamAndStore } from "@/types/props-with-storeid-param-and-store.interface"

const DashboardPage = ({ store }: Readonly<IPropsWithStoreidParamAndStore>) => (
  <div>
    <div>Here is dashboard home route with store</div>
    <div>Store name is: {store.name}</div>
  </div>
)
export default withStoreId(DashboardPage)
