"use client"

import { TrashIcon } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { getFormConstants } from "@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/_components/form.constants"
import { AlertModal } from "@/components/modals/alert-modal/alert-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { ImageUpload } from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ClientRoutes } from "@/routes/client.routes"
import type { ProductSchemaType } from "@/schemas/product.schema"
import { productSchema } from "@/schemas/product.schema"
import { createProduct, deleteProduct, updateProduct } from "@/services/products.service"
import type { StoreIdProductIdParamType } from "@/types/pages-params.type"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Color, Size } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import type { IFormProps } from "./form.props"

export const ClientForm: React.FC<IFormProps> = ({ initialData, categories, colors, sizes: initialSizes }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sizes, setSizes] = useState<Size[]>(initialSizes)
  const router = useRouter()
  const params = useParams<StoreIdProductIdParamType>()

  const { title, description, action, submitSuccess, submitFailed, deleteSuccess, deleteFailed } =
    getFormConstants(!!initialData)

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      description: "",
      isArchived: false,
      isFeatured: false,
      colorId: "",
      sizeId: "",
      categoryId: "",
      images: [],
      meta: {
        title: "",
        description: "",
        keywords: "",
      },
    },
  })

  const onSubmit = async (data: ProductSchemaType): Promise<void> => {
    try {
      setIsLoading(true)
      if (initialData) {
        await updateProduct(params.storeId, params.productId, data)
      } else {
        await createProduct(params.storeId, data)
      }
      toast.success(submitSuccess)
      router.push(ClientRoutes.products(params.storeId))
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error(submitFailed)
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
      toast.success(deleteSuccess)
      router.push(ClientRoutes.products(params.storeId))
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error(deleteFailed)
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
          description={`Are you sure you want to remove product: ${initialData.name}. This action cannot be undone.`}
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
          <FormField
            name={"images"}
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      disabled={isLoading}
                      onChange={(url: string): void => {
                        const currentValue = form.getValues("images")
                        const updatedValue = [...currentValue, { url }]
                        form.setValue("images", updatedValue)
                      }}
                      onRemove={(url: string): void =>
                        field.onChange([...field.value.filter((image) => image.url !== url)])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
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
            <FormField
              name={"categoryId"}
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading || categories.length === 0}
                    defaultValue={value}
                    value={value}
                    onValueChange={onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Category"
                          defaultValue={value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(({ id, name, sizes }) => (
                        <SelectItem
                          key={id}
                          value={id}
                          onClick={() => setSizes(sizes)}
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name={"description"}
              control={form.control}
              render={({ field }) => (
                <FormItem className={"col-span-1 sm:col-span-2"}>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder={"Description..."}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"}>
            <FormField
              name={"colorId"}
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={isLoading || colors.length === 0}
                    defaultValue={value}
                    value={value}
                    onValueChange={onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Color"
                          defaultValue={value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map(({ id, name }: Color) => (
                        <SelectItem
                          key={id}
                          value={id}
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={"sizeId"}
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={isLoading || form.getValues("categoryId") === "" || sizes.length === 0}
                    defaultValue={value}
                    value={value}
                    onValueChange={onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Size"
                          defaultValue={value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map(({ id, name }: Size) => (
                        <SelectItem
                          key={id}
                          value={id}
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"}>
            <FormField
              name={"isFeatured"}
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <FormItem className={"flex gap-2 p-3 space-x-3 space-y-0 rounded-md border-2"}>
                  <FormControl>
                    <Checkbox
                      checked={value}
                      onCheckedChange={onChange}
                      disabled={isLoading}
                    />
                  </FormControl>

                  <div className={"space-y-1 leading-none"}>
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>This product will be displayed on the homepage</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              name={"isArchived"}
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <FormItem className={"flex gap-2 p-3 space-x-3 space-y-0 rounded-md border-2"}>
                  <FormControl>
                    <Checkbox
                      checked={value}
                      onCheckedChange={onChange}
                      disabled={isLoading}
                    />
                  </FormControl>

                  <div className={"space-y-1 leading-none"}>
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>This product will be hidden from the store</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <h2 className={"text-2xl sm:text-3xl mt-5 font-medium"}>Meta information</h2>
          <Separator className={"mb-2"} />

          <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"}>
            <FormField
              name={"meta.title"}
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className={"col-span-1 sm:col-span-2"}>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder={"Title..."}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              name={"meta.description"}
              control={form.control}
              render={({ field }) => (
                <FormItem className={"col-span-1 sm:col-span-2"}>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder={"Description..."}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name={"meta.keywords"}
              control={form.control}
              render={({ field }) => (
                <FormItem className={"col-span-1 sm:col-span-2"}>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder={"Keywords..."}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />

                  <div className={"flex gap-1 flex-wrap py-2"}>
                    {field.value
                      ?.trim()
                      .split(",")
                      .filter(Boolean)
                      .map((keyword: string, index: number) => <Badge key={index}>{keyword}</Badge>)}
                  </div>
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
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
