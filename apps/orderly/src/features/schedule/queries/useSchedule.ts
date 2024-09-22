import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../data/supabase/supabase-client";

export const scheduleKeys = {
  all: ["schedules"] as const,
  lists: () => [...scheduleKeys.all, "list"] as const,
  list: (filters: string) => [...scheduleKeys.lists(), { filters }] as const,
  details: () => [...scheduleKeys.all, "detail"] as const,
  detail: (id?: string | null) => [...scheduleKeys.details(), id] as const,
};








async function getCongregationSchedule(congregation_id: string) {
  const { data, error } = await supabase
    .from("public_talk_details")
    .select()
    .eq("congregation_id", congregation_id);

  if (error) {
    throw new Error(error.message);
  }

  return data ;
}

export const useCongregationScheduleQuery = (
  congregation_id: string | null | undefined
) =>
  useQuery({
    queryKey: scheduleKeys.list(congregation_id || ""),
    queryFn: () => getCongregationSchedule(congregation_id || ""),
    enabled: !!congregation_id,
  });
