import { Tables } from "./supabase-types";

export type Outline = Tables<"outlines">;
export type Congregation = Tables<"congregations">;
export type User = Tables<"users">;

export type Speaker = {
  id: string;
  congregation: Congregation;
  name: User;
  outlines: Outline[];
  availability: number;
};
export type Publisher = { id: string; congregation: Congregation; name: User };

export type SupabaseQueries = Publisher | Speaker;
