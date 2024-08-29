import * as React from "react"

import { FormItemContext } from "@/components/ui/form"
import { cn } from "@/lib/utils"

export const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId()

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn("space-y-2", className)}
          {...props}
        />
      </FormItemContext.Provider>
    )
  },
)
FormItem.displayName = "FormItem"
