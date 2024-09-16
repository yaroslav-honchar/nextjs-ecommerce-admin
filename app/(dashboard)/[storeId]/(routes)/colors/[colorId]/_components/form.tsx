"use client"

import { TrashIcon } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ColorViewer } from "@/components/color-viewer/color-viewer"
import { AlertModal } from "@/components/modals/alert-modal/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ClientRoutes } from "@/routes/client.routes"
import type { ColorSchemaType } from "@/schemas/color.schema"
import { colorSchema } from "@/schemas/color.schema"
import { createColor, deleteColor, updateColor } from "@/services/colors.service"
import type { StoreIdColorIdParamType } from "@/types/pages-params.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import type { IClientFormProps } from "./form.props"

export const ClientForm: React.FC<IClientFormProps> = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const params = useParams<StoreIdColorIdParamType>()

  const title = initialData ? "Edit color" : "Create color"
  const description = initialData ? "Managing store of color" : "Creating store color"
  const toastMessage = initialData ? "Editing saved" : "Created successfully"
  const action = initialData ? "Edit" : "Create"

  const form = useForm<ColorSchemaType>({
    resolver: zodResolver(colorSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  })

  const onSubmit = async (data: ColorSchemaType): Promise<void> => {
    try {
      setIsLoading(true)
      if (initialData) {
        await updateColor(params.storeId, params.colorId, data)
      } else {
        await createColor(params.storeId, data)
      }
      toast.success(toastMessage)
      router.push(ClientRoutes.colors(params.storeId))
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Failed to save")
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async (): Promise<void> => {
    if (isLoading) {
      return
    }

    try {
      setIsLoading(true)
      await deleteColor(params.storeId, params.colorId)
      toast.success("Deleted successfully")
      router.push(ClientRoutes.colors(params.storeId))
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Make sure you removed all products with the color first")
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
          title={"Remove category"}
          description={`Are you sure you want to remove color: ${initialData.name}. This action cannot be undone.`}
          isOpen={isOpen}
          onSubmit={onDelete}
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
          <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"}>
            <FormField
              name={"name"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={"Color name..."}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={"value"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <div className={"flex items-center gap-4"}>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder={"Color value..."}
                        {...field}
                      />
                    </FormControl>
                    <ColorViewer value={field.value} />
                  </div>
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
