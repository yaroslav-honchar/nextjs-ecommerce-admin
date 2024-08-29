"use client"

import * as zod from "zod"
import axios from "axios"

import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = zod.object({
  name: zod.string().min(1),
})

export const StoreModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { isOpen, onClose } = useStoreModal()
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const response = await axios.post("/api/stores", values)
      console.log(response.data)
      toast.success("Store created")
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
            <Form.Field
              control={form.control}
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Name</Form.Label>
                  <Form.Control>
                    <Input
                      disabled={isLoading}
                      placeholder={"E-Commerce example"}
                      {...field}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
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
