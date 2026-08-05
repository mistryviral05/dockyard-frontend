import { GithubInstallation } from "@/features/github/types";
import { create } from "zustand";


type ActiveAccLogin = GithubInstallation


type GithubAccStore = {
    activeAccLogin: ActiveAccLogin | null;
    setActiveAccLogin: (accLogin: ActiveAccLogin) => void;
    initialize: (accLogins: ActiveAccLogin[]) => void;
}


export const useGithubAccStore = create<GithubAccStore>((set) => ({
    activeAccLogin: null,
    setActiveAccLogin: (accLogin: ActiveAccLogin) => {
        localStorage.setItem("active-acc-login", JSON.stringify(accLogin));
        set({ activeAccLogin: accLogin });
    },
    initialize: (accLogins: ActiveAccLogin[]) => {
        if (!accLogins.length) return;

        const stored = localStorage.getItem("active-acc-login");
        if (stored) {
            const parsed = JSON.parse(stored);
            const exists = accLogins.find((acc) => acc.id === parsed.id);
            if (exists) {
                set({ activeAccLogin: exists });
                return;
            }
        }

        const defaultAcc = accLogins[0];
        localStorage.setItem("active-acc-login", JSON.stringify(defaultAcc));
        set({ activeAccLogin: defaultAcc });
    }
}))