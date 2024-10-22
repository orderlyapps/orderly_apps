import { useQuery } from "@tanstack/react-query";
import { Database } from "@repo/supabase/supabase-types";
import { supabase } from "@repo/supabase/supabase-client";

export const peopleKeys = {
  all: ["peoples"] as const,
  lists: () => [...peopleKeys.all, "list"] as const,
  list: (filters: string) => [...peopleKeys.lists(), { filters }] as const,
  details: () => [...peopleKeys.all, "detail"] as const,
  detail: (id?: string | null) => [...peopleKeys.details(), id] as const,
};

export type Person = Database["public"]["Tables"]["people"]["Insert"];

export type PersonAny = {
  [K in keyof Person]: any;
};

export type Publisher = Database["public"]["Views"]["publishers"]["Row"];
