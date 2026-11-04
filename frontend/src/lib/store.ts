import { create } from "zustand";

type DashboardState = {
  activeSection: string;
  sidebarCollapsed: boolean;
  setActiveSection: (section: string) => void;
  toggleSidebar: () => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  activeSection: "Visão geral",
  sidebarCollapsed: false,
  setActiveSection: (activeSection) => set({ activeSection }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
