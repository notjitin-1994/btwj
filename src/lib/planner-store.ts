import { create } from "zustand";

/**
 * Global store for the trip-planning dialog.
 * Any component can call `openPlanner()` to show the 6-step questionnaire.
 */
interface PlannerState {
  open: boolean;
  openPlanner: () => void;
  closePlanner: () => void;
  togglePlanner: () => void;
}

export const usePlanner = create<PlannerState>((set) => ({
  open: false,
  openPlanner: () => set({ open: true }),
  closePlanner: () => set({ open: false }),
  togglePlanner: () => set((s) => ({ open: !s.open })),
}));
