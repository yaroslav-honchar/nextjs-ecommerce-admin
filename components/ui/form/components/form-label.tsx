import * as React from "react"

import type * as LabelPrimitive from "@radix-ui/react-label"
import { useFormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"
