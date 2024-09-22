import { supabase } from "../../../data/supabase/supabase-client";

export const supabaseSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  return null || error;
};
