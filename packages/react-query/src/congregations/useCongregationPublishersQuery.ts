import { useQuery } from "@tanstack/react-query";
// import { peopleKeys } from "../usePeople";
import { supabase } from "@repo/supabase/supabase-client";
import { peopleKeys } from "../people/usePeople";

async function getCongregationPublishers(congregation_id: string) {
  const { data, error } = await supabase
    .from("publishers")
    .select()
    .eq("congregation_id", congregation_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const useCongregationPublishersQuery = (
  congregation_id: string | null | undefined
) =>
  useQuery({
    queryKey: peopleKeys.list(congregation_id || ""),
    queryFn: () => getCongregationPublishers(congregation_id || ""),
    enabled: !!congregation_id,
  });
