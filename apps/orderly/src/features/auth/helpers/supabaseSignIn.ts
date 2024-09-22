import { supabase } from "../../../data/supabase/supabase-client";

export async function supabaseSignIn() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: import.meta.env.VITE_AUTH_REDIRECT,
    },
  });
  return data || error;
}
