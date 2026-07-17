import { create } from "zustand";

/**
 * Global store for the contact dialog.
 * Any component can call `openContact()` to show the generic contact form.
 */
interface ContactState {
  open: boolean;
  openContact: () => void;
  closeContact: () => void;
  toggleContact: () => void;
}

export const useContact = create<ContactState>((set) => ({
  open: false,
  openContact: () => set({ open: true }),
  closeContact: () => set({ open: false }),
  toggleContact: () => set((s) => ({ open: !s.open })),
}));
