"use client"

import type React from "react"
import { useEffect } from "react"

import { useStoreModal } from "@/hooks/use-store-modal"

const SetupPage: React.FC = () => {
  const { isOpen, onOpen } = useStoreModal(({ isOpen, onOpen }) => ({
    isOpen,
    onOpen,
  }))

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return null
}

export default SetupPage
