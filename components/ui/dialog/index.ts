import { DialogContent } from "@/components/ui/dialog/components/dialog-content"
import { DialogDescription } from "@/components/ui/dialog/components/dialog-description"
import { DialogFooter } from "@/components/ui/dialog/components/dialog-footer"
import { DialogHeader } from "@/components/ui/dialog/components/dialog-header"
import { DialogOverlay } from "@/components/ui/dialog/components/dialog-overlay"
import { DialogTitle } from "@/components/ui/dialog/components/dialog-title"
import { DialogClose } from "@/components/ui/dialog/dialog-close"
import { DialogPortal } from "@/components/ui/dialog/dialog-portal"
import { DialogRoot } from "@/components/ui/dialog/dialog-root"
import { DialogTrigger } from "@/components/ui/dialog/dialog-trigger"

const Dialog = Object.assign(DialogRoot, {
  Overlay: DialogOverlay,
  Close: DialogClose,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
})

export { Dialog, DialogOverlay, DialogPortal, DialogClose, DialogTrigger }
