import type { Metadata } from "next"

import React from "react"

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
          <SignedIn>
            <UserButton />
            <SignOutButton />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
