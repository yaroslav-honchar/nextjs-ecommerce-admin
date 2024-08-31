"use client"

import * as zod from "zod"
import { TrashIcon } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import type { StoreIdCategoryIdParamType } from "@/types/pages-params.type"
import { AlertModal } from "@/components/modals/alert-modal/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ClientRoutes } from "@/routes/client.routes"
import { createCategory, deleteCategory, updateCategory } from "@/services/categories.service"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Billboard, Category } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

interface ICategoryFormProps {
  initialData: Category | null
  billboards: Billboard[]
}

const formSchema = zod.object({
  name: zod.string().min(1),
  billboardId: zod.string().min(1),
})

type CategoryFormValuesType = zod.infer<typeof formSchema>

export const CategoryForm: React.FC<ICategoryFormProps> = ({ initialData, billboards }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const params = useParams<StoreIdCategoryIdParamType>()

  const title = initialData ? "Edit category" : "Create category"
  const description = initialData ? "Managing store of category" : "Creating store category"
  const toastMessage = initialData ? "Category editing saved" : "Category created"
  const action = initialData ? "Edit" : "Create"

  const form = useForm<CategoryFormValuesType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  })

  const onSubmit = async (data: CategoryFormValuesType): Promise<void> => {
    try {
      setIsLoading(true)
      if (initialData) {
        await updateCategory(params.storeId, params.categoryId, data)
      } else {
        await createCategory(params.storeId, data)
      }
      toast.success(toastMessage)
      router.push(ClientRoutes.categories(params.storeId))
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Failed to save category")
    } finally {
      setIsLoading(false)
    }
  }

  const onDeleteCategory = async (): Promise<void> => {
    if (isLoading) {
      return
    }

    try {
      setIsLoading(true)
      await deleteCategory(params.storeId, params.categoryId)
      toast.success("Category deleted successfully")
      router.push(ClientRoutes.categories(params.storeId))
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error("Make sure you removed all products from the category first")
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
          description={`Are you sure you want to remove category: ${initialData.name}. This action cannot be undone.`}
          isOpen={isOpen}
          onSubmit={onDeleteCategory}
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
                      placeholder={"Category name..."}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={"billboardId"}
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={isLoading}
                    defaultValue={value}
                    value={value}
                    onValueChange={onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Billboard"
                          defaultValue={value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map(({ id, label }: Billboard) => (
                        <SelectItem
                          key={id}
                          value={id}
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
