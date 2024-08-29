import { FormControl } from "./components/form-control"
import { FormDescription } from "./components/form-description"
import { FormField } from "./components/form-field"
import { FormItem } from "./components/form-item"
import { FormLabel } from "./components/form-label"
import { FormMessage } from "./components/form-message"

import { FormRoot } from "./form.root"

export { type FormFieldContextValue } from "./types/form-field-context-value.type"
export { type FormItemContextValue } from "./types/form-item-context-value.type"
export { FormFieldContext } from "./context/form-field.context"
export { FormItemContext } from "./context/form-item.context"
export { useFormField } from "./hooks/useFormField.hook"

export const Form = Object.assign(FormRoot, {
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
})
