import type { Metadata } from "next"

import React from "react"

import { ModalProvider } from "@/providers/modal-provider"
import { ToastProvider } from "@/providers/toast-provider"
import { ClerkProvider, SignOutButton, SignedIn, UserButton } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider />
          <ToastProvider />
          <div className={"w-full h-full flex flex-col"}>
            <header>
              <SignedIn>
                <UserButton />
                <SignOutButton />
              </SignedIn>
            </header>
            <main className={"flex-grow flex flex-col"}>{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
