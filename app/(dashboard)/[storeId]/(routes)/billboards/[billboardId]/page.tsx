import React from "react"

const BillboardsNewPage: React.FC<{
  params: { billboardId: string }
}> = async ({ params: { billboardId } }) => <p>This is the billboards form page: {billboardId}</p>

export default BillboardsNewPage
