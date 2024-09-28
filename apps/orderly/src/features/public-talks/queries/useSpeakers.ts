export const speakers = {
  all: ["peoples"] as const,
  lists: () => [...speakers.all, "list"] as const,
  list: (filters: string) => [...speakers.lists(), { filters }] as const,
  details: () => [...speakers.all, "detail"] as const,
  detail: (id?: string | null) => [...speakers.details(), id] as const,
};
