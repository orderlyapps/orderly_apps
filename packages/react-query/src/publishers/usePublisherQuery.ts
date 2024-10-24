import { useQuery } from "@tanstack/react-query";
import { supabase } from "@repo/supabase/supabase-client";

async function getData(id: string) {
  const { data, error } = await supabase
    .from("publishers")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const usePublisherQuery = (id?: string | null) =>
  useQuery({
    queryKey: ["publisher"],
    queryFn: () => (id ? getData(id) : Promise.resolve(null)),
    enabled: !!id,
  });
