import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../data/supabase/supabase-client";
import { outlines } from "./useSpeakers";

async function getOutlines() {
  const { data, error } = await supabase.from("outlines").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const useOutlinesQuery = () =>
  useQuery({
    queryKey: outlines.all,
    queryFn: () => getOutlines(),
  });
