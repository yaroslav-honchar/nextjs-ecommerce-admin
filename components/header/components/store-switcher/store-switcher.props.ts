import type { PopoverTriggerProps } from "@radix-ui/react-popover"
import type { Store } from "@prisma/client"

export interface IStoreSwitcherProps extends PopoverTriggerProps {
  items: Store[]
}
