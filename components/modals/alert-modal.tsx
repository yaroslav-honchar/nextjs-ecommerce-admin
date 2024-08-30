import type { PropsWithChildren } from "react"
import React from "react"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"

import { useMounted } from "@/hooks/use-mounted"

interface IAlertModalProps extends PropsWithChildren {
  title: string
  description: string
  onSubmit: () => void
  isDisabledSubmit?: boolean
  isDisabled?: boolean
  isOpen: boolean
  onClose: () => void
}

export const AlertModal: React.FC<IAlertModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  children,
  isDisabledSubmit = false,
  isDisabled = false,
}) => {
  const isMounted = useMounted()
  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      {children && <div className={"mb-5"}>{children}</div>}
      <div className={"flex gap-5 justify-end"}>
        <Button
          type={"submit"}
          variant={"outline"}
          onClick={onClose}
          disabled={isDisabled}
        >
          Cancel
        </Button>
        <Button
          type={"submit"}
          variant={"destructive"}
          onClick={onSubmit}
          disabled={isDisabledSubmit || isDisabled}
        >
          Submit
        </Button>
      </div>
    </Modal>
  )
}
