import type { IApiAlertProps } from "@/components/api-alert/api-alert.props"

export const textMap: Record<IApiAlertProps["variant"], "Public" | "Admin"> = {
  admin: "Admin",
  public: "Public",
}
