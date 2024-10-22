import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../data/supabase/supabase-client";

async function getUser(id: string) {
  const { data, error } = await supabase
    .from("publishers")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const useUserQuery = (id: string) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
};
