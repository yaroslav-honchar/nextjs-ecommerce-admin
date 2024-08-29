"use client"

import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal()

  return (
    <Modal
      title={"Create store"}
      description={"Add new store to manage products and categories"}
      isOpen={isOpen}
      onClose={onClose}
    >
      Store modal
    </Modal>
  )
}
