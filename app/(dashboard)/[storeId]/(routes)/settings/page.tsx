import React from "react"
import type { IPropsWithStoreidParamAndStore } from "@/types/pages-props.interface"
import { withStoreId } from "@/hocs/with-store-id"
import { ClientForm } from "./components/form"

const SettingsPage: React.FC<Readonly<IPropsWithStoreidParamAndStore>> = ({ store }) => (
  <ClientForm initialData={store} />
)

export default withStoreId(SettingsPage)
