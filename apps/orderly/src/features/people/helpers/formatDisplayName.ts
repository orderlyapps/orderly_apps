import { Publisher } from "../queries/usePeople";

export const formatDisplayName = ({
  display_name,
  first_name,
  last_name,
}: Publisher) => {
  const displayName = display_name ? display_name : first_name;

  return `${last_name ? last_name + ", " : ""}${displayName || ""}`;
};
