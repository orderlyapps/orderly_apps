import { supabase } from "../../../data/supabase/supabase-client";

export const supabaseSignOut = async () => {
  return await supabase.auth.signOut();
};
