import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Database } from "../../../util/supabase-types";
import { supabase } from "../../../data/supabase/supabase-client";

const peopleKeys = {
  all: ["peoples"] as const,
  lists: () => [...peopleKeys.all, "list"] as const,
  list: (filters: string) => [...peopleKeys.lists(), { filters }] as const,
  details: () => [...peopleKeys.all, "detail"] as const,
  detail: (id?: string | null) => [...peopleKeys.details(), id] as const,
};

type Person = Database["public"]["Tables"]["people"]["Insert"];
type Publisher = Database["public"]["Views"]["publishers"]["Row"];

// QUERIES

async function getPeople() {
  const { data, error } = await supabase.from("people").select();
  if (data) {
    return data;
  }
  throw error;
}
async function getPublishers() {
  const { data, error } = await supabase.from("publishers").select();
  if (data) {
    return data;
  }
  throw error;
}

async function getPublisher(id: string) {
  const { data, error } = await supabase
    .from("publishers")
    .select()
    .eq("id", id)
    .single();
  if (data) {
    return data;
  }
  throw error;
}

async function upsertPerson(newData: Person) {
  console.log("newData:", newData);
  const { data, error } = await supabase
    .from("people")
    .upsert(newData)
    .select()
    .single();
  if (data) {
    console.log("upsertPerson() data:", data);
    return data;
  }
  console.error("upsertPerson() error:", error);
  throw error;
}

// HOOKS

export const usePeopleQuery = () =>
  useQuery({
    queryKey: peopleKeys.all,
    queryFn: getPeople,
  });

export const usePublishersQuery = () =>
  useQuery({
    queryKey: peopleKeys.all,
    queryFn: getPublishers,
  });

export const usePublisherQuery = (id?: string | null) =>
  useQuery({
    queryKey: peopleKeys.detail(id),
    queryFn: () => (id ? getPublisher(id) : Promise.resolve(null)),
    enabled: !!id,
  });

export const useUpsertPersonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (person: Person) => upsertPerson(person),
    onSuccess: (people) => {
      queryClient.setQueryData(peopleKeys.all, (oldData: Person[]) =>
        oldData ? [...oldData, people] : [people]
      );
    },
  });
};
