"use client"

import React from "react"
import { ApiAlert } from "@/components/api-alert/api-alert"
import { useOrigin } from "@/hooks/use-origin"
import { useParams } from "next/navigation"

interface IApiListProps {
  entityName: string
  entityIdName: string
}

export const ApiList: React.FC<IApiListProps> = ({ entityName, entityIdName }) => {
  const params = useParams<{ storeId: string }>()
  const origin = useOrigin()
  const baseUrl = `${origin}/api/${params.storeId}`

  return (
    <div className={"flex flex-col gap-4"}>
      <ApiAlert
        title={"GET"}
        description={`${baseUrl}/${entityName}`}
        variant={"public"}
      />
      <ApiAlert
        title={"GET"}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant={"public"}
      />
      <ApiAlert
        title={"POST"}
        description={`${baseUrl}/${entityName}`}
        variant={"admin"}
      />
      <ApiAlert
        title={"PATCH"}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant={"admin"}
      />
      <ApiAlert
        title={"DELETE"}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant={"admin"}
      />
    </div>
  )
}
