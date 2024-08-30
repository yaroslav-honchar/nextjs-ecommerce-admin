"use client"

import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react"

import type { ComponentPropsWithoutRef } from "react"
import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal"
import { cn } from "@/lib/utils"
import type { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>

type FormatedItemType = {
  label: string
  value: string
}

interface IStoreSwitcher extends PopoverTriggerProps {
  items: Store[]
}

export const StoreSwitcher: React.FC<IStoreSwitcher> = ({ className, items = [] }) => {
  const storeModal = useStoreModal()
  const params = useParams<{ storeId: string }>()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const formattedItems = items.map(
    ({ name, id }: Store): FormatedItemType => ({
      label: name,
      value: id,
    }),
  )

  const selectedStore = items.find(({ id }: Store): boolean => id === params.storeId)

  const onStoreSelect = (store: FormatedItemType): void => {
    setIsOpen(false)
    router.push(`/${store.value}`)
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        <Button
          className={cn("flex items-center justify-start gap-2 w-[12.5rem]", className)}
          variant={"outline"}
          size={"sm"}
          role={"combobox"}
          aria-expanded={isOpen}
          aria-label={"Select a store"}
          title={selectedStore?.name}
        >
          <StoreIcon className={"w-4 n-4"} />
          <span className={"truncate"}>{selectedStore?.name}</span>
          <ChevronsUpDown className={"w-4 n-4 ms-auto shrink-0 opacity-50"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-[12.5rem] p-0"}>
        <Command>
          <CommandList>
            <CommandInput placeholder={"Search store..."} />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading={"Stores"}>
              {formattedItems.map(({ label, value }: FormatedItemType) => (
                <CommandItem
                  className={"gap-2"}
                  key={value}
                  onSelect={(): void => onStoreSelect({ label, value })}
                  title={label}
                >
                  <StoreIcon className={"w-4 n-4"} />
                  <span className={"truncate"}>{label}</span>
                  {selectedStore?.id === value && <Check className={"w-4 n-4 ms-auto"} />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandList>
            <CommandGroup>
              <CommandItem
                className={"gap-2"}
                onSelect={(): void => {
                  setIsOpen(false)
                  storeModal.onOpen()
                }}
              >
                <PlusCircle className={"w-4 n-4"} />
                Create new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
