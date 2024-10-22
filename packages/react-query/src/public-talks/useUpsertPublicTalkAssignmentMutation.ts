import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@repo/supabase/supabase-client";
// import { StoreState } from "../../../data/zustand/useStore";

type StoreState = any;

async function upsertData({
  week,
  speaker_id,
  congregation_id,
  outline_id,
}: StoreState["publicTalkDetails"]) {
  const { data, error } = await supabase
    .from("public_talk_assignments")
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
    mutationFn: (publicTalkDetails: StoreState["publicTalkDetails"]) =>
      upsertData(publicTalkDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["public_talk_assignment_details"],
      });
    },
  });
};
