"use client"

import { TrashIcon } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ApiAlert } from "@/components/api-alert/api-alert"
import { AlertModal } from "@/components/modals/alert-modal/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ClientRoutes } from "@/routes/client.routes"
import { deleteStore, updateStore } from "@/services/stores.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import type { IClientFormProps } from "./form.props"
import type { StoreDataType } from "./form.schema"
import { storeDataSchema } from "./form.schema"

export const ClientForm: React.FC<IClientFormProps> = ({ initialData }) => {
  // const origin = useOrigin()
  const [deleteStoreSubmitInputValue, setDeleteStoreSubmitInputValue] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const { name } = initialData
  const form = useForm<StoreDataType>({
    resolver: zodResolver(storeDataSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: StoreDataType): Promise<void> => {
    try {
      setIsLoading(true)
      await updateStore(initialData.id, data)
      router.refresh()
      toast.success("Store updated successfully")
    } catch (error) {
      console.log(error)
      toast.error("Failed to update store")
    } finally {
      setIsLoading(false)
    }
  }

  const onDeleteStore = async (): Promise<void> => {
    if (deleteStoreSubmitInputValue.trim() !== initialData.name || isLoading) {
      return
    }

    try {
      setIsLoading(true)
      await deleteStore(initialData.id)
      toast.success("Store removed successfully")
      router.push(ClientRoutes.home)
    } catch (error) {
      console.log(error)
      toast.error("Make sure to remove all products and categories before deleting the store.")
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  const onAlertModalClose = (): void => {
    if (isLoading) {
      return
    }

    setIsOpen(false)
    setDeleteStoreSubmitInputValue("")
  }

  return (
    <>
      <AlertModal
        title={"Remove store"}
        description={`Are you sure you want to remove store: ${name}. This action cannot be undone.`}
        isOpen={isOpen}
        onSubmit={onDeleteStore}
        onClose={onAlertModalClose}
        isDisabledSubmit={deleteStoreSubmitInputValue.trim() !== initialData.name}
        isDisabled={isLoading}
      >
        <p className={"text-sm mb-4"}>
          To confirm, type "<b>{initialData.name}</b>" in the box below
        </p>
        <Input
          value={deleteStoreSubmitInputValue}
          onChange={({ target }): void => setDeleteStoreSubmitInputValue(target.value)}
        />
      </AlertModal>
      <div className={"flex gap-5 justify-between mb-4"}>
        <Heading
          title={"Settings"}
          description={`Managing preferences of store: ${name}`}
        />

        <Button
          className={"gap-2 items-center"}
          variant={"destructive"}
          onClick={() => setIsOpen(true)}
        >
          <TrashIcon className={"w-4 h-4"} />
          Remove store
        </Button>
      </div>

      <Separator className={"my-5"} />

      <Form {...form}>
        <form
          className={"flex flex-col gap-8"}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"}>
            <FormField
              name={"name"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={"Company name..."}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={"flex items-center gap-2 mt-auto"}>
            <Button
              className={"w-full sm:w-[12.5rem]"}
              type={"submit"}
              disabled={isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
      <Separator className={"my-5"} />
      <ApiAlert
        title={".env"}
        description={`NEXT_PUBLIC_API_URL="${origin}/api/${initialData.id}"`}
        variant={"public"}
      />
    </>
  )
}
