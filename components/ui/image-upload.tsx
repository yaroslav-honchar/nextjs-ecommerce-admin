"use client"

import { ImagePlus, TrashIcon } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import React from "react"
import { Button } from "@/components/ui/button"
import { useMounted } from "@/hooks/use-mounted"
import Image from "next/image"

interface IImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

export const ImageUpload: React.FC<IImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  const isMounted = useMounted()

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className={"mb-4 flex items-center gap-4 flex-wrap"}>
        {value.map((url: string) => (
          <div
            key={url}
            className={"relative w-36 lg:w-[12.5rem] h-36 lg:h-[12.5rem] rounded-md overflow-hidden"}
          >
            <Button
              className={"absolute top-2 right-2 p-2 rounded-bl-md z-10"}
              size={"icon"}
              variant={"destructive"}
              onClick={() => onRemove(url)}
            >
              <TrashIcon className={"w-4 h-4"} />
            </Button>
            <Image
              width={200}
              height={200}
              className={"object-cover w-36 lg:w-[12.5rem] h-36 lg:h-[12.5rem]"}
              src={url}
              alt={"Image"}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset={"f0icfhva"}
      >
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button
              className={"gap-2 items-center"}
              type={"button"}
              variant={"secondary"}
              disabled={disabled}
              onClick={onClick}
            >
              <ImagePlus className={"w-4 h-4"} />
              Add an image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
