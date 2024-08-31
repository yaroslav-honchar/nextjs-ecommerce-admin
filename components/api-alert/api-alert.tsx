"use client"

import { CopyIcon, ServerIcon } from "lucide-react"
import React from "react"
import toast from "react-hot-toast"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { textMap } from "./lib/text.map"
import { variantMap } from "./lib/variant.map"

import type { IApiAlertProps } from "./api-alert.props"

export const ApiAlert: React.FC<IApiAlertProps> = ({ title, description, variant }) => {
  const onCopy = (): void => {
    navigator.clipboard
      .writeText(description)
      .then((): void => {
        toast.success("Copied to clipboard")
      })
      .catch((): void => {
        toast.error("Could not copy to clipboard")
      })
  }

  return (
    <Alert>
      <div className={"flex items-start gap-2 mb-4"}>
        <ServerIcon className="w-4 h-4 mt-[2px]" />
        <AlertTitle className={"flex items-center gap-2"}>
          {title}
          <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
        </AlertTitle>
      </div>
      <AlertDescription className={"flex items-start gap-5 w-full"}>
        <code className={"relative rounded bg-muted p-2 font-mono text-sm w-full"}>
          {description}
        </code>
        <Button
          className={"ms-auto"}
          size={"icon"}
          variant={"outline"}
          onClick={onCopy}
        >
          <CopyIcon className={"w-4 h-4"} />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
