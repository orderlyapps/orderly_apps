import { useQuery } from "@tanstack/react-query";
import { Database } from "../../../util/supabase-types";
import { supabase } from "../../../data/supabase/supabase-client";

export const scheduleKeys = {
  all: ["schedules"] as const,
  lists: () => [...scheduleKeys.all, "list"] as const,
  list: (filters: string) => [...scheduleKeys.lists(), { filters }] as const,
  details: () => [...scheduleKeys.all, "detail"] as const,
  detail: (id?: string | null) => [...scheduleKeys.details(), id] as const,
};

export type ScheduleRow = Omit<
  Database["public"]["Views"]["schedule"]["Row"],
  "public_talk_details"
>;

export type PublicTalkDetails =
  Database["public"]["Views"]["publishers"]["Row"];

export type WeeklySchedule = ScheduleRow & {
  public_talk_details: PublicTalkDetails;
};

async function getCongregationSchedule(congregation_id: string) {
  const { data, error } = await supabase
    .from("schedule")
    .select()
    .eq("congregation_id", congregation_id);

  if (error) {
    throw new Error(error.message);
  }

  return data as WeeklySchedule[];
}

export const useCongregationScheduleQuery = (
  congregation_id: string | null | undefined
) =>
  useQuery({
    queryKey: scheduleKeys.list(congregation_id || ""),
    queryFn: () => getCongregationSchedule(congregation_id || ""),
    enabled: !!congregation_id,
  });
