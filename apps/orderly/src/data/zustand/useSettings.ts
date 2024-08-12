import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./createSelectors";
import { Session } from "@supabase/auth-js";

export type SettingsState = typeof initialState;

const initialState = {
  session: null as Session | null,
  online: true as boolean,
  theme: "auto" as "dark" | "light" | "auto",
} as const;

type SettingsActions = {
  resetSettings: () => void;
  setSettingsProperties: (
    store: keyof SettingsState,
    newData: SettingsState[keyof SettingsState]
  ) => void;
};

const useSettingsBase = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      settings: null as any,
      session: null as any,
      online: null as any,
      theme: "light" as any,
      resetSettings: () =>
        set(() => ({
          ...initialState,
        })),

      setSettingsProperties: (
        store: keyof SettingsState,
        newData: SettingsState[keyof SettingsState]
      ) => {
        set((state: SettingsState) => ({
          [store]: newData,
        }));
      },
    }),
    {
      name: "settings", // name of the item in the storage (must be unique)
    }
  )
);

export const useSettings = createSelectors(useSettingsBase);
