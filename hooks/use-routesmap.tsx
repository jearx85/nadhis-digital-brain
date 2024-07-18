import { create } from "zustand";

type ShowRoutes = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

export const useShowRoutesMap = create<ShowRoutes>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));
