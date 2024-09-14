"use client"

import { TrashIcon } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { AlertModal } from "@/components/modals/alert-modal/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { ImageUpload } from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ClientRoutes } from "@/routes/client.routes"
import { createBillboard, deleteBillboard, updateBillboard } from "@/services/billboards.service"
import type { StoreIdBillboardIdParamType } from "@/types/pages-params.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import type { IClientFormProps } from "./form.props"
import type { BillboardDataType } from "./form.schema"
import { billboardDataSchema } from "./form.schema"

export const ClientForm: React.FC<IClientFormProps> = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const params = useParams<StoreIdBillboardIdParamType>()

  const title = initialData ? "Edit billboard" : "Create billboard"
  const description = initialData ? "Managing store of billboard" : "Creating store billboard"
  const toastMessage = initialData ? "Billboard editing saved" : "Billboard created"
  const action = initialData ? "Edit" : "Create"

  const form = useForm<BillboardDataType>({
    resolver: zodResolver(billboardDataSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  })

  const onSubmit = async (data: BillboardDataType): Promise<void> => {
    try {
      setIsLoading(true)
      if (initialData) {
        await updateBillboard(params.storeId, params.billboardId, data)
      } else {
        await createBillboard(params.storeId, data)
      }
      toast.success(toastMessage)
      router.push(ClientRoutes.billboards(params.storeId))
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Failed to save billboard")
    } finally {
      setIsLoading(false)
    }
  }

  const onDeleteBillboard = async (): Promise<void> => {
    if (isLoading) {
      return
    }

    try {
      setIsLoading(true)
      await deleteBillboard(params.storeId, params.billboardId)
      toast.success("Billboard deleted successfully")
      router.push(ClientRoutes.billboards(params.storeId))
    } catch (error) {
      console.log(error)
      toast.error("Make sure you removed all categories from the billboard first")
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
          title={"Remove billboard"}
          description={`Are you sure you want to remove billboard: ${initialData.label}. This action cannot be undone.`}
          isOpen={isOpen}
          onSubmit={onDeleteBillboard}
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
            Remove
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

          <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"}>
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
              className={"w-full lg:w-[12.5rem]"}
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
