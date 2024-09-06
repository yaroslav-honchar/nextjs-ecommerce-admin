import type { PropsWithChildren } from "react"
import type { IPropsWithStoreidParamAndStore } from "@/types/pages-props.interface"
import { withStoreId } from "@/hocs/with-store-id"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar/sidebar"

const DashboardLayout = ({ children }: Readonly<IPropsWithStoreidParamAndStore & PropsWithChildren>) => {
  return (
    <div className={"grid grid-cols-12 size-screen flex-grow grid-rows-[var(--header-height)_auto] overflow-hidden"}>
      <Header className={"col-span-12"} />
      <Sidebar className={"col-span-2"} />
      <div className={"flex flex-col flex-grow lg:p-8 p-4 col-span-10 overflow-auto"}>{children}</div>
    </div>
  )
}

export default withStoreId(DashboardLayout)
