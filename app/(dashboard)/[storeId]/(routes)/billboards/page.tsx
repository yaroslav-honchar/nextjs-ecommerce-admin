import React from "react"

import type { IPropsWithStoreidParamAndStore } from "@/types/pages-props.interface"

import { withStoreId } from "@/hocs/with-store-id"

import { BillboardClient } from "./components/client"

const BillboardsPage: React.FC<Readonly<IPropsWithStoreidParamAndStore>> = () => <BillboardClient />

export default withStoreId(BillboardsPage)
