import { TrashIcon } from "lucide-react"

import React from "react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import type { Store } from "@prisma/client"

interface ISettingsFormProps {
  initialData: Store
}

export const SettingsForm: React.FC<ISettingsFormProps> = ({ initialData }) => {
  const { name } = initialData

  return (
    <div>
      <div className={"flex gap-5 justify-between"}>
        <Heading
          title={"Settings"}
          description={`Managing preferences of store: ${name}`}
        />

        <Button variant={"destructive"}>
          <TrashIcon className={"w-4 h-4"} />
          Remove store
        </Button>
      </div>
    </div>
  )
}
