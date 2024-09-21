export function formatName(
  person: {
    first_name?: string | null;
    middle_name?: string | null;
    last_name?: string | null;
    display_name?: string | null;
  },
  options?: {
    format:
      | "first_last"
      | "display_last"
      | "last_first"
      | "first_middle_last"
      | "display_name";
  }
) {
  const firstName = person?.first_name || "";
  const middleName = person?.middle_name || "";
  const lastName = person?.last_name || "";
  const displayName = person?.display_name || "";

  if (options?.format === "display_name" && displayName) {
    return displayName;
  }

  if (options?.format === "first_last" && firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  if (options?.format === "display_last" && firstName && lastName) {
    return `${displayName || firstName || ""} ${lastName}`;
  }

  if (options?.format === "last_first" && lastName && firstName) {
    return `${lastName} ${firstName}`;
  }

  if (
    options?.format === "first_middle_last" &&
    firstName &&
    middleName &&
    lastName
  ) {
    return `${firstName} ${middleName} ${lastName}`;
  }

  return `${lastName || ""}${lastName && displayName ? ", " : ""}${displayName || firstName || ""}`;
}
