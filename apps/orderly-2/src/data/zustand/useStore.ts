import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./createSelectors";
import { Database } from "../../util/supabase-types";
import { Session } from "@supabase/supabase-js";
import { Publisher } from "../../features/people/queries/usePeople";

const initialState = {
  personDetails: {} as Publisher,
  publicTalkDetails: {} as Database["public"]["Views"]["public_talk_assignment_details"]["Row"],
  user: {} as Publisher,
  congregationDetails:
    {} as Database["public"]["Tables"]["congregations"]["Update"],
  session: null as Session | null,
  online: true as boolean,
  theme: "light" as "dark" | "light" | "auto",
};

export type StoreState = typeof initialState;

type StoreActions = {
  resetStore: () => void;
  resetStoreProperty: (property: keyof typeof initialState) => void;
  setStoreProperties: <K extends keyof StoreState>(
    property: K,
    value: Partial<StoreState[K]> | "reset"
  ) => void;
};

const useStoreBase = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      resetStore: () =>
        set(() => ({
          ...initialState,
        })),

      resetStoreProperty: (property) => {
        set((state) => {
          return {
            ...state,
            [property]: initialState[property],
          };
        });
      },

      setStoreProperties: (property, value) => {
        set((state) => {
          if (value === "reset") {
            return {
              ...state,
              [property]: initialState[property],
            };
          }

          const existingValues =
            typeof state[property] === "object" ? state[property] : null;
          const valueIsObject = typeof value === "object" ? { ...value } : null;

          if (!valueIsObject) {
            return {
              ...state,
              [property]: value,
            };
          }

          return {
            ...state,
            [property]: {
              ...(typeof existingValues === "object" ? existingValues : {}),
              ...valueIsObject,
            },
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