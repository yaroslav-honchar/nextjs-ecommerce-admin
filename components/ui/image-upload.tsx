"use client"

import type { CloudinaryUploadWidgetResults } from "next-cloudinary"
import { CldUploadWidget } from "next-cloudinary"
import { ImagePlus, TrashIcon } from "lucide-react"
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

  const onUpload = async (result: CloudinaryUploadWidgetResults | undefined) => {
    if (!result || !result.info || typeof result.info === "string") {
      return console.log("No result")
    }

    onChange(result.info.secure_url)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className={"mb-4 flex items-center gap-4"}>
        {value.map((url: string) => (
          <div
            key={url}
            className={"relative w-[12.5rem] h-[12.5rem] rounded-md overflow-hidden"}
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
              className={"w-full h-full object-cover"}
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
