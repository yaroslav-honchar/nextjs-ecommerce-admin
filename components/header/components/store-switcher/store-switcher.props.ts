import type { Store } from "@prisma/client"
import type { PopoverTriggerProps } from "@radix-ui/react-popover"

export interface IStoreSwitcherProps extends PopoverTriggerProps {
  items: Store[]
}
