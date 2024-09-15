import {} from "./useUpsertCongregationPublishersMutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { peopleKeys, Person, PersonAny, Publisher } from "./usePeople";
import { supabase } from "../../../data/supabase/supabase-client";

async function upsertPerson(newData: Publisher) {
  function personify(publisher: Publisher): PersonAny {
    const { is_admin, congregation_name, admin_count, ...person } = publisher;
    return person;
  }

  const { data, error } = await supabase
    .from("people")
    .upsert(personify(newData))
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const useUpsertCongregationPublishersMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (person: Publisher) => upsertPerson(person),
    onSuccess: (person) => {
      queryClient.invalidateQueries({
        queryKey: peopleKeys.list(person.congregation_id || ""),
      });
      queryClient.invalidateQueries({
        queryKey: peopleKeys.detail(person.id || ""),
      });
    },
  });
};
