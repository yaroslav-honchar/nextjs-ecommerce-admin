import type { VariantProps } from "class-variance-authority"

import type * as React from "react"

import type { buttonVariants } from "@/components/ui/button"

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
