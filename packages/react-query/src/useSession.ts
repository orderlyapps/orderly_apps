import { supabase } from "@repo/supabase/supabase-client";
import { supabaseSignIn } from "@repo/supabase/supabase-sign-in";
import { supabaseSignOut } from "@repo/supabase/supabase-sign-out";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// TODO change this to zustand

const sessionKeys = {
  all: ["session"] as const,
  lists: () => [...sessionKeys.all, "list"] as const,
  list: (filters: string) => [...sessionKeys.lists(), { filters }] as const,
  details: () => [...sessionKeys.all, "detail"] as const,
  detail: (id: string) => [...sessionKeys.details(), id] as const,
};

async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export const useSessionQuery = () => {
  return useQuery({
    queryKey: sessionKeys.all,
    queryFn: getSession,
  });
};

export const useGoogleSignInSessionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: supabaseSignIn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionKeys.all,
        refetchType: "all",
      });
    },
  });
};

export const useSignOutSessionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: supabaseSignOut,
    onSuccess: () => {
      queryClient.setQueryData(sessionKeys.all, null);
    },
  });
};
