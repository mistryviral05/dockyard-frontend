// stores/workspace-store.ts
import { create } from "zustand";

export type ActiveWorkspace = {
  id: string;
  name: string;
  slug: string;
};

type WorkspaceStore = {
  activeWorkspace: ActiveWorkspace | null;

  setWorkspace: (workspace: ActiveWorkspace) => void;

  initialize: (
    workspaces: ActiveWorkspace[]
  ) => void;
};

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  activeWorkspace: null,

  setWorkspace: (workspace) => {
    localStorage.setItem("active-workspace", JSON.stringify(workspace));

    set({
      activeWorkspace: workspace,
    });
  },

  initialize: (workspaces) => {
    if (!workspaces.length) return;

    const stored = localStorage.getItem("active-workspace");

    if (stored) {
      const parsed = JSON.parse(stored);

      const exists = workspaces.find((w) => w.id === parsed.id);

      if (exists) {
        set({ activeWorkspace: exists });
        return;
      }
    }

    const personal =
      workspaces.find((w) => w.slug === "personal-workspace") ??
      workspaces[0];

    localStorage.setItem(
      "active-workspace",
      JSON.stringify(personal)
    );

    set({
      activeWorkspace: personal,
    });
  },
}));