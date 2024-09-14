import { useQuery } from "@tanstack/react-query";
import { peopleKeys } from "./usePeople";
import { supabase } from "../../../data/supabase/supabase-client";

async function getPublisher(id: string) {
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
    queryKey: peopleKeys.detail(id),
    queryFn: () => (id ? getPublisher(id) : Promise.resolve(null)),
    enabled: !!id,
  });
