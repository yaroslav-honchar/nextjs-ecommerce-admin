import React from "react"
import { ClientForm } from "@/app/(dashboard)/[storeId]/(routes)/settings/_components/form"
import { withStoreId } from "@/hocs/with-store-id"
import type { IPropsWithStoreidParamAndStore } from "@/types/pages-props.interface"

const SettingsPage: React.FC<Readonly<IPropsWithStoreidParamAndStore>> = ({ store }) => (
  <ClientForm initialData={store} />
)

export default withStoreId(SettingsPage)
