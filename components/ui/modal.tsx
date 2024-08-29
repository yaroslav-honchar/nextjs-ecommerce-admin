"use client"

import React from "react"

import { Dialog } from "@/components/ui/dialog"

interface IModalProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal: React.FC<IModalProps> = ({ children, isOpen, onClose, title, description }) => {
  const onChange = (open: boolean): void => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onChange}
    >
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
        </Dialog.Header>
        <div>{children}</div>
      </Dialog.Content>
    </Dialog>
  )
}
