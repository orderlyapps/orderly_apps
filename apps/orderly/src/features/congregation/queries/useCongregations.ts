import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Database } from "../../../util/supabase-types";
import { supabase } from "../../../data/supabase/supabase-client";

const congregationsKeys = {
  all: ["congregations"] as const,
  lists: () => [...congregationsKeys.all, "list"] as const,
  list: (filters: string) =>
    [...congregationsKeys.lists(), { filters }] as const,
  details: () => [...congregationsKeys.all, "detail"] as const,
  detail: (id?: string | null) => [...congregationsKeys.details(), id] as const,
};

type Congregation = Database["public"]["Tables"]["congregations"]["Insert"];

// QUERIES

async function getCongregations() {
  const { data, error } = await supabase.from("congregations").select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

async function getCongregation(id: string) {
  const { data, error } = await supabase
    .from("congregations")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

async function upsertCongregation(newData: Congregation) {
  const { data, error } = await supabase
  .from("congregations")
  .upsert(newData)
  .select()
  .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// HOOKS

export const useCongregationsQuery = () =>
  useQuery({
    queryKey: congregationsKeys.all,
    queryFn: getCongregations,
  });

export const useCongregationQuery = (id?: string | null) =>
  useQuery({
    queryKey: congregationsKeys.detail(id),
    queryFn: () => (id ? getCongregation(id) : Promise.resolve(null)),
    enabled: !!id,
  });

export const useUpsertCongregationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (congregation: Congregation) =>
      upsertCongregation(congregation),
    onSuccess: (congregations) => {
      queryClient.setQueryData(
        congregationsKeys.all,
        (oldData: Congregation[]) =>
          oldData ? [...oldData, congregations] : [congregations]
      );
    },
  });
};
