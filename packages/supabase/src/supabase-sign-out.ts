import { supabase } from "./supabase-client";

export const supabaseSignOut = async () => {
  return await supabase.auth.signOut();
};
