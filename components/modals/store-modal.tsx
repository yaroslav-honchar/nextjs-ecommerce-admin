"use client"

import * as zod from "zod"

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
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = zod.object({
  name: zod.string().min(1),
})

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal()
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    console.log(values)
    // TODO: Create store
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
              >
                Cancel
              </Button>
              <Button type={"submit"}>Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}
