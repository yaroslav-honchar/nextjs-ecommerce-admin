import React from "react"

import { SettingsForm } from "./components/settings-form"
import { withStoreId } from "@/hocs/with-store-id"
import type { IPropsWithStoreidParamAndStore } from "@/types/props-with-storeid-param-and-store.interface"

const SettingsPage: React.FC<Readonly<IPropsWithStoreidParamAndStore>> = ({ store }) => (
  <div className={"flex-grow lg:p-8 p-4"}>
    <SettingsForm initialData={store} />
  </div>
)

export default withStoreId(SettingsPage)
