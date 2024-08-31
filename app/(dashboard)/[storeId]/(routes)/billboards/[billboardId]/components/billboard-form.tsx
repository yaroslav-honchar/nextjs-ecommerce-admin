"use client"

import * as zod from "zod"

import { TrashIcon } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import type { StoreIdBillboardIdParamType } from "@/types/pages-params.type"

import { AlertModal } from "@/components/modals/alert-modal/alert-modal"
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
import { ImageUpload } from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { createBillboard, updateBillboard } from "@/services/billboards.service"

import { zodResolver } from "@hookform/resolvers/zod"
import type { Billboard } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

interface IBillboardFormProps {
  initialData: Billboard | null
}

const formSchema = zod.object({
  name: zod.string().min(1),
  label: zod.string().min(1),
  imageUrl: zod.string().min(1),
})

type BillboardFormValuesType = zod.infer<typeof formSchema>

export const BillboardForm: React.FC<IBillboardFormProps> = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const params = useParams<StoreIdBillboardIdParamType>()

  const title = initialData ? "Edit billboard" : "Create billboard"
  const description = initialData ? "Managing store of billboard" : "Creating store billboard"
  const toastMessage = initialData ? "Billboard editing saved" : "Billboard created"
  const action = initialData ? "Edit" : "Create"

  const form = useForm<BillboardFormValuesType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  })

  const onSubmit = async (data: BillboardFormValuesType): Promise<void> => {
    console.log(data)

    try {
      setIsLoading(true)
      if (initialData) {
        await updateBillboard(params.storeId, params.billboardId, data)
      } else {
        await createBillboard(params.storeId, data)
      }
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      console.log(error)
      toast.error("Make sure you removed all categories from the billboard first")
    } finally {
      setIsLoading(false)
    }
  }

  const onDeleteStore = async (): Promise<void> => {
    try {
      setIsLoading(true)
      // Delete billboard
      toast.success("")
      router.push("/")
    } catch (error) {
      console.log(error)
      toast.error("")
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
  }

  return (
    <>
      {initialData && (
        <AlertModal
          title={"Remove store"}
          description={`Are you sure you want to remove billboard: ${initialData.label}. This action cannot be undone.`}
          isOpen={isOpen}
          onSubmit={onDeleteStore}
          onClose={onAlertModalClose}
          isDisabled={isLoading}
        />
      )}
      <div className={"flex gap-5 justify-between mb-4"}>
        <Heading
          title={title}
          description={description}
        />

        {initialData && (
          <Button
            className={"gap-2 items-center"}
            variant={"destructive"}
            onClick={() => setIsOpen(true)}
          >
            <TrashIcon className={"w-4 h-4"} />
            Remove billboard
          </Button>
        )}
      </div>

      <Separator className={"my-5"} />

      <Form {...form}>
        <form
          className={"flex flex-col gap-8"}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name={"imageUrl"}
            control={form.control}
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={value ? [value] : []}
                    disabled={isLoading}
                    onChange={(url: string): void => onChange(url)}
                    onRemove={(): void => onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={"grid grid-cols-3 gap-5"}>
            <FormField
              name={"label"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={"Billboards label..."}
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
              className={"w-[12.5rem]"}
              type={"submit"}
              disabled={isLoading}
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
