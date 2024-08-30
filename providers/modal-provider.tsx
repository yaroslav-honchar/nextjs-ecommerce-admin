"use client"

import { useEffect, useState } from "react"

import { CreateStoreModal } from "@/components/modals/create-store-modal"

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect((): void => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateStoreModal />
    </>
  )
}
