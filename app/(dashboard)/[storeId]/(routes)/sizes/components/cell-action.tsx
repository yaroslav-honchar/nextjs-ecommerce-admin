"use client"

import { CopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import React, { useState } from "react"
import toast from "react-hot-toast"
import type { StoreIdParamType } from "@/types/pages-params.type"
import { AlertModal } from "@/components/modals/alert-modal/alert-modal"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ClientRoutes } from "@/routes/client.routes"
import { deleteSize } from "@/services/sizes.service"
import { useParams, useRouter } from "next/navigation"
import type { ICellActionProps } from "./cell-action.props"

export const CellAction: React.FC<ICellActionProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const params = useParams<StoreIdParamType>()
  const router = useRouter()

  const onCopyId = (): void => {
    navigator.clipboard
      .writeText(data.id)
      .then(() => {
        toast.success("ID copied to clipboard")
      })
      .catch((err) => {
        console.log(err)
        toast.error("Failed to copy ID to clipboard")
      })
  }

  const onEdit = (): void => {
    router.push(ClientRoutes.sizeEdit(params.storeId, data.id))
  }

  const onAlertModalClose = (): void => {
    setIsOpen(false)
  }

  const onDelete = async (): Promise<void> => {
    if (isLoading) {
      return
    }

    try {
      setIsLoading(true)
      await deleteSize(params.storeId, data.id)
      toast.success("Size deleted successfully")
      router.push(ClientRoutes.sizes(params.storeId))
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Make sure you removed all products with the size first")
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        title={"Remove category"}
        description={`Are you sure you want to remove size: ${data.name}. This action cannot be undone.`}
        isOpen={isOpen}
        onSubmit={onDelete}
        onClose={onAlertModalClose}
        isDisabled={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={"icon"}
            variant={"ghost"}
          >
            <MoreHorizontalIcon className="w-6 h-6" />
            <span className={"sr-only"}>Open options menu of size {data.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={"end"}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className={"flex items-start gap-2"}
            onClick={onCopyId}
            disabled={isLoading}
          >
            <CopyIcon className="w-4 h-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"flex items-start gap-2"}
            onClick={onEdit}
            disabled={isLoading}
          >
            <EditIcon className="w-4 h-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"flex items-start gap-2"}
            onClick={() => setIsOpen(true)}
            disabled={isLoading}
          >
            <TrashIcon className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
