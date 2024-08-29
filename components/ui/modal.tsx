"use client"

import React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
