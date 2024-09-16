"use client"

import { TrashIcon } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { getFormConstants } from "@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/_components/form.constants"
import { AlertModal } from "@/components/modals/alert-modal/alert-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ClientRoutes } from "@/routes/client.routes"
import type { SubCategorySchemaType } from "@/schemas/sub-category.schema"
import { subCategorySchema } from "@/schemas/sub-category.schema"
import { createSubCategory, deleteSubCategory, updateSubCategory } from "@/services/sub-categories.service"
import type { StoreIdSubCategoryIdParamType } from "@/types/pages-params.type"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Category } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import type { IClientFormProps } from "./form.props"

export const ClientForm: React.FC<IClientFormProps> = ({ initialData, categories }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const params = useParams<StoreIdSubCategoryIdParamType>()

  const { title, description, action, submitSuccess, submitFailed, deleteSuccess, deleteFailed } =
    getFormConstants(!!initialData)

  const form = useForm<SubCategorySchemaType>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: initialData || {
      name: "",
      categoryId: "",
      meta: {
        title: "",
        description: "",
        keywords: "",
      },
    },
  })

  const onSubmit = async (data: SubCategorySchemaType): Promise<void> => {
    try {
      setIsLoading(true)
      if (initialData) {
        await updateSubCategory(params.storeId, params.subCategoryId, data)
      } else {
        await createSubCategory(params.storeId, data)
      }
      toast.success(submitSuccess)
      router.push(ClientRoutes.subCategories(params.storeId))
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
      await deleteSubCategory(params.storeId, params.subCategoryId)
      toast.success(deleteSuccess)
      router.push(ClientRoutes.subCategories(params.storeId))
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
          title={"Remove subcategory"}
          description={`Are you sure you want to remove subcategory: ${initialData.name}. This action cannot be undone.`}
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
                      placeholder={"Subcategory name..."}
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
                      <SelectTrigger
                        className="w-full"
                        disabled={isLoading || categories.length === 0}
                      >
                        <SelectValue
                          placeholder="Category..."
                          defaultValue={value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(({ id, name }: Category) => (
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
