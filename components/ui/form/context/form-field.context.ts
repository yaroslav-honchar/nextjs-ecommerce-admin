import * as React from "react"

import type { FormFieldContextValue } from "@/components/ui/form"

export const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)
