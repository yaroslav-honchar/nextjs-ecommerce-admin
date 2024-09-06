import type { ComponentPropsWithoutRef } from "react"
import type { PopoverTrigger } from "@/components/ui/popover"

export type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>

export type FormatedItemType = {
  label: string
  value: string
}
