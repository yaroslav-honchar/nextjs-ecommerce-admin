"use client"

import type * as zod from "zod"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"

import { createStore } from "@/services/stores.service"

import { useStoreModal } from "@/hooks/use-store-modal"

import { zodResolver } from "@hookform/resolvers/zod"

import { formSchema } from "./form.schema"

export const CreateStoreModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { isOpen, onClose } = useStoreModal()
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (data: zod.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const response = await createStore(data)
      window.location.assign(`/${response.id}`)
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title={"Create store"}
      description={"Add new store to manage products and categories"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={"space-y-8 py-2 pb-4"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={"E-Commerce example"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={"name"}
            />

            <div className={"pt-6 space-x-2 flex items-center justify-end"}>
              <Button
                variant={"outline"}
                onClick={onClose}
                type={"button"}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type={"submit"}
                disabled={isLoading}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}
