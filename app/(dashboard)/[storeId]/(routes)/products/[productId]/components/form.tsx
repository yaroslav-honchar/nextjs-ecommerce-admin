"use client"

import { TrashIcon } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import type { StoreIdProductIdParamType } from "@/types/pages-params.type"
import { AlertModal } from "@/components/modals/alert-modal/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { ImageUpload } from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ClientRoutes } from "@/routes/client.routes"
import { createProduct, deleteProduct, updateProduct } from "@/services/products.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import type { IFormProps } from "./form.props"
import type { ProductDataType } from "./form.schema"
import { productDataSchema } from "./form.schema"

export const ClientForm: React.FC<IFormProps> = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const params = useParams<StoreIdProductIdParamType>()

  const title = initialData ? "Edit product" : "Create product"
  const description = initialData ? "Managing store of product" : "Creating store product"
  const toastMessage = initialData ? "Editing saved" : "Created successfully"
  const action = initialData ? "Edit" : "Create"

  const form = useForm<ProductDataType>({
    resolver: zodResolver(productDataSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      isArchived: false,
      isFeatured: false,
      colorId: "",
      sizeId: "",
      categoryId: "",
      images: [],
    },
  })

  const onSubmit = async (data: ProductDataType): Promise<void> => {
    try {
      setIsLoading(true)
      if (initialData) {
        await updateProduct(params.storeId, params.productId, data)
      } else {
        await createProduct(params.storeId, data)
      }
      toast.success(toastMessage)
      router.push(ClientRoutes.products(params.storeId))
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
      await deleteProduct(params.storeId, params.productId)
      toast.success("Deleted successfully")
      router.push(ClientRoutes.products(params.storeId))
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Make sure you removed all categories, colors and sizes with the product first")
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
          description={`Are you sure you want to remove poduct: ${initialData.name}. This action cannot be undone.`}
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
          {/*TODO: fix the bug with uploading photo*/}
          <FormField
            name={"images"}
            control={form.control}
            render={({ field: { value, onChange } }) => {
              console.log(value)
              return (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={value.map((image) => image.url)}
                      disabled={isLoading}
                      onChange={(url: string): void => onChange([...value, { url }])}
                      onRemove={(url: string): void => onChange([...value.filter((image) => image.url !== url)])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <div className={"grid grid-cols-3 gap-5"}>
            <FormField
              name={"name"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={"Product name..."}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={"price"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type={"number"}
                      disabled={isLoading}
                      placeholder={"99.99$"}
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
