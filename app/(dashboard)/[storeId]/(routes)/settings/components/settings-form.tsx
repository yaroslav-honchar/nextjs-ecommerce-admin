"use client"

import * as zod from "zod"
import axios from "axios"
import { TrashIcon } from "lucide-react"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Store } from "@prisma/client"
import { useRouter } from "next/navigation"

interface ISettingsFormProps {
  initialData: Store
}

const formSchema = zod.object({
  name: zod.string().min(1),
})

type SettingsFormValuesType = zod.infer<typeof formSchema>

export const SettingsForm: React.FC<ISettingsFormProps> = ({ initialData }) => {
  const [deleteStoreSubmitInputValue, setDeleteStoreSubmitInputValue] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const { name } = initialData
  const form = useForm<SettingsFormValuesType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: SettingsFormValuesType): Promise<void> => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/stores/${initialData.id}`, data)
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
    if (deleteStoreSubmitInputValue.trim() !== initialData.name) {
      return
    }

    try {
      setIsLoading(true)
      await axios.delete(`/api/stores/${initialData.id}`)
      toast.success("Store removed successfully")
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete store")
    } finally {
      setIsLoading(false)
      router.push("/")
    }
  }

  const onAlertModalClose = (): void => {
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

      <Form {...form}>
        <form
          className={"flex-grow flex flex-col gap-8"}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className={"grid grid-cols-3 gap-5"}>
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

          <div className={"flex items-center justify-end gap-2 mt-auto"}>
            <Button
              className={"w-[12.5rem]"}
              type={"submit"}
              disabled={isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
