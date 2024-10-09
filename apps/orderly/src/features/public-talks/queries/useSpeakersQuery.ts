import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../data/supabase/supabase-client";
import { speakers } from "./useSpeakers";

async function getSpeakers() {
  const { data, error } = await supabase.from("speakers").select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const useSpeakersQuery = () =>
  useQuery({
    queryKey: speakers.all,
    queryFn: () => getSpeakers(),
  });