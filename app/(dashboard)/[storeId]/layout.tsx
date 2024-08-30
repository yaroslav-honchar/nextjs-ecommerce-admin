import type { PropsWithChildren } from "react"

import { Header } from "@/components/header"
import { withStoreId } from "@/hocs/with-store-id"
import type { IPropsWithStoreidParamAndStore } from "@/types/props-with-storeid-param-and-store.interface"

const DashboardLayout = ({
  children,
}: Readonly<IPropsWithStoreidParamAndStore & PropsWithChildren>) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default withStoreId(DashboardLayout)
