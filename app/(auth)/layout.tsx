import type { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className={"w-full h-full flex flex-col items-center justify-center"}>{children}</div>
}
