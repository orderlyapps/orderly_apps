import { useQuery } from "@tanstack/react-query";
import { supabase } from "@repo/supabase/supabase-client";
import { Speaker } from "@repo/supabase/types";
import { PostgrestError } from "@supabase/supabase-js";

async function getData() {
  const { data, error } = (await supabase.from("speakers").select("*")) as {
    data: Speaker[];
    error: PostgrestError | null;
  };

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const useSpeakersQuery = () =>
  useQuery({
    queryKey: ["speakers"],
    queryFn: () => getData(),
  });
