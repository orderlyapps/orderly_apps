import { useQuery } from "@tanstack/react-query";
import { supabase } from "@repo/supabase/supabase-client";

async function getData() {
  const { data, error } = await supabase.from("congregations").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const useCongregationsQuery = () =>
  useQuery({
    queryKey: ["congregations"],
    queryFn: () => getData(),
  });
