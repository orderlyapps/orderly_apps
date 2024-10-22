import { supabase } from "@repo/supabase/supabase-client";
import { useQuery } from "@tanstack/react-query";

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
