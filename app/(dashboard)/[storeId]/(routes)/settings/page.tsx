import React from "react"

import type { IPropsWithStoreidParamAndStore } from "@/types/props-with-storeid-param-and-store.interface"

import { withStoreId } from "@/hocs/with-store-id"

import { SettingsForm } from "./components/settings-form"

const SettingsPage: React.FC<Readonly<IPropsWithStoreidParamAndStore>> = ({ store }) => (
  <div className={"flex-grow flex flex-col lg:p-8 p-4"}>
    <SettingsForm initialData={store} />
  </div>
)

export default withStoreId(SettingsPage)
