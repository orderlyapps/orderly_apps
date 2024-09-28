import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../data/supabase/supabase-client";
import { speakers } from "./useSpeakers";

async function getPublisher(id: string) {
  const { data, error } = await supabase
    .from("speakers")
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
    queryKey: speakers.detail(id),
    queryFn: () => (id ? getPublisher(id) : Promise.resolve(null)),
    enabled: !!id,
  });
