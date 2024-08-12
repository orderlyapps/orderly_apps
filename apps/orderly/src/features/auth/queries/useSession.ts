import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../data/supabase/supabase-client";

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
async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: import.meta.env.VITE_AUTH_REDIRECT,
    },
  });
  return data || error;
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return null || error;
};

export const useSessionQuery = () => {
  return useQuery({
    queryKey: sessionKeys.all,
    queryFn: getSession,
  });
};

export const useGoogleSignInSessionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signInWithGoogle,
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
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData(sessionKeys.all, null);
    },
  });
};
