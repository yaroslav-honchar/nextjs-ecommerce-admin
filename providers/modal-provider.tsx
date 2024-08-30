"use client"

import { CreateStoreModal } from "@/components/modals/create-store-modal/create-store-modal"

import { useMounted } from "@/hooks/use-mounted"

export const ModalProvider = () => {
  const isMounted = useMounted()
  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateStoreModal />
    </>
  )
}
