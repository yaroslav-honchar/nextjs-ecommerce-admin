import type { PropsWithChildren } from "react"

import type { IPropsWithStoreidParamAndStore } from "@/types/props-with-storeid-param-and-store.interface"

import { withStoreId } from "@/hocs/with-store-id"

import { Header } from "@/components/header"

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
