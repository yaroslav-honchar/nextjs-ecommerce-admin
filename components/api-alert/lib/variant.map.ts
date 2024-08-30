import type { IApiAlertProps } from "@/components/api-alert/api-alert.props"

export const variantMap: Record<IApiAlertProps["variant"], "secondary" | "destructive"> = {
  public: "secondary",
  admin: "destructive",
}
