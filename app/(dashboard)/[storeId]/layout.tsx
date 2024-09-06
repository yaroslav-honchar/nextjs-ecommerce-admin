import type { PropsWithChildren } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar/sidebar"
import { withStoreId } from "@/hocs/with-store-id"
import type { IPropsWithStoreidParamAndStore } from "@/types/pages-props.interface"

const DashboardLayout = ({ children }: Readonly<IPropsWithStoreidParamAndStore & PropsWithChildren>) => {
  return (
    <>
      <Header className={"col-span-12"} />

      <div className={"flex justify-end size-screen flex-grow overflow-hidden"}>
        <Sidebar />
        <div
          className={
            "flex flex-col w-full lg:w-[calc(100%-var(--sidebar-width))] max-lg:translate-x-[var(--sidebar-width)] lg:p-8 p-4 col-span-10 overflow-auto bg-background min-h-fit transition-all duration-300"
          }
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default withStoreId(DashboardLayout)
