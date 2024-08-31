import * as zod from "zod"

export const formSchema = zod.object({
  name: zod.string().min(1),
})

export type SettingsFormValuesType = zod.infer<typeof formSchema>
