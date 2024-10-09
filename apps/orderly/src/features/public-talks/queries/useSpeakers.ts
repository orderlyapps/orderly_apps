import { Database } from "../../../util/supabase-types";

export const speakers = {
  all: ["peoples"] as const,
  lists: () => [...speakers.all, "list"] as const,
  list: (filters: string) => [...speakers.lists(), { filters }] as const,
  details: () => [...speakers.all, "detail"] as const,
  detail: (id?: string | null) => [...speakers.details(), id] as const,
};

export const outlines = {
  all: ["outlines"] as const,
  lists: () => [...outlines.all, "list"] as const,
  list: (filters: string) => [...outlines.lists(), { filters }] as const,
  details: () => [...outlines.all, "detail"] as const,
  detail: (id?: string | null) => [...outlines.details(), id] as const,
};

export type PublicTalkAssignment =
  Database["public"]["Tables"]["public_talks_speaker"]["Row"];
