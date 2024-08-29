import { create } from "zustand"

interface IUseStoreModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useStoreModal = create<IUseStoreModalStore>((set) => ({
  isOpen: false,
  onOpen: (): void => set({ isOpen: true }),
  onClose: (): void => set({ isOpen: false }),
}))
