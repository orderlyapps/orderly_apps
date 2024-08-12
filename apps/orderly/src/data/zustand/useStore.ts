import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./createSelectors";
import { Database } from "../../util/supabase-types";
import { Session } from "@supabase/supabase-js";
import { Publisher } from "../../features/people/queries/usePeople";

const initialState = {
  personDetails: {} as Publisher,
  user: {} as Publisher,
  congregationDetails:
    {} as Database["public"]["Tables"]["congregations"]["Update"],
  session: null as Session | null,
  online: true as boolean,
  theme: "light" as "dark" | "light" | "auto",
};

type StoreState = typeof initialState;

type StoreActions = {
  resetStore: () => void;
  setStoreProperties: <K extends keyof StoreState>(
    property: K,
    value: StoreState[K]
  ) => void;
};

const useStoreBase = create<StoreState & StoreActions>()(
  persist(
    (set) => ({
      ...initialState,

      resetStore: () =>
        set(() => ({
          ...initialState,
        })),

      setStoreProperties: (property, value) => {
        set((state) => {
          const existingValues =
            typeof state[property] === "object" ? state[property] : null;
          const valueObject = typeof value === "object" ? { ...value } : null;

          if (!valueObject) {
            return {
              ...state,
              [property]: value,
            };
          }

          return {
            ...state,
            [property]: { ...existingValues, ...valueObject },
          };
        });
      },
    }),
    {
      name: "store", // name of the item in the storage (must be unique)
    }
  )
);

export const useStore = createSelectors(useStoreBase);
