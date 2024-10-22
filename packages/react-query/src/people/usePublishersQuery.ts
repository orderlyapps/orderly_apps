import { useQuery } from "@tanstack/react-query";
import { supabase } from "@repo/supabase/supabase-client";
import { Publisher } from "@repo/supabase/types";
import { PostgrestError } from "@supabase/supabase-js";

async function getData() {
  const { data, error } = (await supabase.from("publishers").select("*")) as {
    data: Publisher[];
    error: PostgrestError | null;
  };

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const usePublishersQuery = () =>
  useQuery({
    queryKey: ["publishers"],
    queryFn: () => getData(),
  });
