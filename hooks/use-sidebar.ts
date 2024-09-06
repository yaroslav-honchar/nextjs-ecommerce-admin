import { create } from "zustand"

interface ISidebarStore {
  isOpen: boolean
  onOpen: () => void
  onToggle: () => void
  onClose: () => void
}

export const useSidebar = create<ISidebarStore>((set) => ({
  isOpen: true,
  onOpen: (): void =>
    set(() => {
      document.documentElement.style.setProperty("--sidebar-width", "240px")
      return { isOpen: true }
    }),
  onToggle: (): void => {
    set(({ isOpen }) => {
      if (isOpen) {
        document.documentElement.style.setProperty("--sidebar-width", "0px")
      } else {
        document.documentElement.style.setProperty("--sidebar-width", "240px")
      }
      return { isOpen: !isOpen }
    })
  },
  onClose: (): void =>
    set(() => {
      document.documentElement.style.setProperty("--sidebar-width", "0px")
      return { isOpen: false }
    }),
}))
