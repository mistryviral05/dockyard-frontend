// stores/workspace-store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ActiveWorkspace = {
  id: string;
  name: string;
  slug: string;
};

type WorkspaceStore = {
  activeWorkspace: ActiveWorkspace | null;
  hasHydrated: boolean;
  setWorkspace: (workspace: ActiveWorkspace) => void;
  initialize: (workspaces: ActiveWorkspace[]) => void;
  setHasHydrated: (state: boolean) => void;
};

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set, get) => ({
      activeWorkspace: null,
      hasHydrated: false,

      setWorkspace: (workspace) => {
        set({ activeWorkspace: workspace });
      },

      initialize: (workspaces) => {
        if (!workspaces.length) return;

        const current = get().activeWorkspace;


        if (current) {
          const exists = workspaces.find((w) => w.id === current.id);
          if (exists) {
            set({ activeWorkspace: exists });
            return;
          }
        }

        const personal =
          workspaces.find((w) => w.slug === "personal-workspace") ??
          workspaces[0];

        set({ activeWorkspace: personal });
      },

      setHasHydrated: (state) => {
        set({ hasHydrated: state });
      },
    }),
    {
      name: "active-workspace",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ activeWorkspace: state.activeWorkspace }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);