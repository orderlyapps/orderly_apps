import { useQuery } from "@tanstack/react-query";
import { supabase } from "@repo/supabase/supabase-client";

async function getData(congregation_id: string) {
  const { data, error } = await supabase
    .from("public_talk_assignment_details")
    .select()
    .eq("congregation_id", congregation_id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const usePublicTalkAssignmentDetailsQuery = (
  congregation_id: string | null | undefined
) =>
  useQuery({
    queryKey: ["public_talk_assignment_details"],
    queryFn: () => getData(congregation_id || ""),
    enabled: !!congregation_id,
  });
