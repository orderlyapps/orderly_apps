import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../data/supabase/supabase-client";
import { StoreState } from "../../../data/zustand/useStore";
import { scheduleKeys } from "../../schedule/queries/useSchedule";

async function upsertAssignment({
  week,
  speaker_id,
  congregation_id,
  outline_id,
}: StoreState["publicTalkDetails"]) {
  const { data, error } = await supabase
    .from("public_talks_speaker")
    .upsert({ speaker_id, congregation_id, outline_id, week } as any)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const useUpsertPublicTalkAssignmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (person: StoreState["publicTalkDetails"]) =>
      upsertAssignment(person),
    onSuccess: (person) => {
      queryClient.invalidateQueries({
        queryKey: scheduleKeys.list(person.congregation_id || ""),
      });
    },
  });
};
