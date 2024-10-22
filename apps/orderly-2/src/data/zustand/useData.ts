import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./createSelectors";
import { Database } from "../../util/supabase-types";
import { supabase } from "../supabase/supabase-client";
import { PostgrestError } from "@supabase/supabase-js";

// export type Tables = keyof Database["public"]["Tables"];
// export type Rows = Database["public"]["Tables"][Tables]["Row"];
export type PeopleRow = Database["public"]["Tables"]["people"]["Row"];
export type CongregationRow =
  Database["public"]["Tables"]["congregations"]["Row"];

export type TableState = { people: PeopleRow[] } & {
  congregations: CongregationRow[];
};
export type RowState = {
  user: Partial<PeopleRow>;
} & {
  newPerson: Partial<PeopleRow>;
} & {
  newCongregation: Partial<CongregationRow>;
};

export type DataState = TableState & RowState;
export type DataStateProperties = keyof DataState;
export type SelectedTableRows = {
  people: "newPerson";
  congregations: "newCongregation";
};

export type TableNames = keyof TableState;

const key = {
  people: "newPerson",
  congregations: "newCongregation",
  events: "newEvent",
} as const;

type DataActions = {
  initTableData: (
    table: TableNames
  ) => Promise<{ data?: RowState[]; message?: string; error?: PostgrestError }>;
  setData: (
    data: DataStateProperties,
    newData: DataState[DataStateProperties]
  ) => void;
  setRowDataByID: <T extends keyof TableState>(
    table: T,
    rowType: SelectedTableRows[T],
    id: string
  ) => Promise<PeopleRow | PostgrestError>;
  upsertTableData: (table: TableNames) => Promise<{
    data?: any, //RowState[];
    message?: string;
    error?: PostgrestError | null;
  }>;
};

export const useDataBase = create<DataState & DataActions>()(
  persist(
    (set, get) => ({
      people: [],
      newPerson: {},
      user: {},
      congregations: [],
      newCongregation: {},
      initTableData: async (table) => {
        try {
          const { data, error } = await supabase.from(table).select("*");

          if (!data) throw error;

          set((state: DataState) => ({
            ...state,
            [table]: data,
          }));
          return {
            data,
            message: table + ` data initialised from cloud`,
          } as any;
        } catch (error) {
          return error;
        }
      },
      setData(
        data: DataStateProperties,
        newData: DataState[DataStateProperties]
      ) {
        set(() => ({
          [data]: { ...newData },
        }));
      },
      setRowDataByID: async (table, rowType, id) => {
        const tableData = get()[table];
        try {
          const data = tableData?.find((row: { id: string }) => {
            return row.id === id;
          });
          if (!data) throw "Data not found";
          set(() => ({
            [rowType]: data,
          }));
          return data as any;
        } catch (error) {
          return error;
        }
      },
      upsertTableData: async (table) => {
        const newData = get()[key[table]];

        try {
          const { data, error } = await supabase
            .from(table)
            .upsert(newData)
            .select();

          if (error) throw error;
          if (!data) throw "Add data failed";

          set(() => ({
            [table]: data,
          }));
          return { data, error };
        } catch (error: any) {
          return { error };
        }
      },
    }),
    {
      name: "data", // name of the item in the storage (must be unique)
    }
  )
);

export const useData = createSelectors(useDataBase);
