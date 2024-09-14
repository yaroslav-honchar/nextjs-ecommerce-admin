import React from "react"
import { withStoreId } from "@/hocs/with-store-id"
import type { IPropsWithStoreidParamAndStore } from "@/types/pages-props.interface"
import { ClientForm } from "./components/form"

const SettingsPage: React.FC<Readonly<IPropsWithStoreidParamAndStore>> = ({ store }) => (
  <ClientForm initialData={store} />
)

export default withStoreId(SettingsPage)
