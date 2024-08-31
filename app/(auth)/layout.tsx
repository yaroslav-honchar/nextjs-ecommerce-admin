import type { PropsWithChildren } from "react"

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return <div className={"flex-grow flex flex-col items-center justify-center p-4 lg:p-6"}>{children}</div>
}
