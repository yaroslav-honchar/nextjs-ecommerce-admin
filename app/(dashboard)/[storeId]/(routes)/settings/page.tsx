import React from "react"

import type { IPropsWithStoreidParamAndStore } from "@/types/props-with-storeid-param-and-store.interface"

import { withStoreId } from "@/hocs/with-store-id"

import { SettingsForm } from "./components/settings-form"

const SettingsPage: React.FC<Readonly<IPropsWithStoreidParamAndStore>> = ({ store }) => (
  <SettingsForm initialData={store} />
)

export default withStoreId(SettingsPage)
