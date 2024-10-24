import { useQuery } from "@tanstack/react-query";
import { supabase } from "@repo/supabase/supabase-client";
import { Outline } from "@repo/supabase/types";
import { PostgrestError } from "@supabase/supabase-js";

async function getData() {
  const { data, error } = (await supabase.from("outlines").select("*")) as {
    data: Outline[];
    error: PostgrestError | null;
  };

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const useOutlinesQuery = () =>
  useQuery({
    queryKey: ["outlines"],
    queryFn: () => getData(),
  });
