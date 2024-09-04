import type { Metadata } from "next"
import type { PropsWithChildren } from "react"
import React from "react"
import { ModalProvider } from "@/providers/modal-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { ToastProvider } from "@/providers/toast-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider />
            <ToastProvider />
            <div className={"w-full h-full flex flex-col"}>{children}</div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
