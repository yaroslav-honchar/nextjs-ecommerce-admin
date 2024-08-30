"use client"

import * as zod from "zod"
import { TrashIcon } from "lucide-react"

import React, { useState } from "react"
import { useForm } from "react-hook-form"

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

interface ISettingsFormProps {
  initialData: Store
}

const formSchema = zod.object({
  name: zod.string().min(1),
})

type SettingsFormValuesType = zod.infer<typeof formSchema>

export const SettingsForm: React.FC<ISettingsFormProps> = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { name } = initialData
  const form = useForm<SettingsFormValuesType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (values: SettingsFormValuesType): Promise<void> => {
    console.log(values)
    console.log(isOpen)
    try {
      setIsLoading(true)
      // Send request to update store
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
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
