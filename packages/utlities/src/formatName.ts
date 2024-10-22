import { User } from "@repo/supabase/types";

/**
 * Formats the name of a person based on the provided options.
 * @param person The user object containing the name details
 * @param options The formatting options for the name
 * @returns The formatted name based on the options
 */
export function formatName(
  person: User,
  options?: {
    format: "first last" | "display last" | "last, first" | "first middle last";
  }
) {
  const firstName = person?.first_name || "";
  const middleName = person?.middle_name || "";
  const lastName = person?.last_name || "";
  const displayName = person?.display_name || "";

  if (options?.format === "display last") {
    // Return display name followed by last name
    return `${displayName || firstName || ""} ${lastName || ""}`;
  }

  if (options?.format === "first last" && firstName && lastName) {
    // Return first name followed by last name
    return `${firstName} ${lastName}`;
  }

  if (options?.format === "last, first" && lastName && firstName) {
    // Return last name followed by first name
    return `${lastName}, ${firstName}`;
  }

  if (
    options?.format === "first middle last" &&
    firstName &&
    middleName &&
    lastName
  ) {
    // Return first name followed by middle name and last name
    return `${firstName} ${middleName} ${lastName}`;
  }

  // Fallback to last name with display name or first name
  return `${lastName ? `${lastName}, ` : ""}${displayName || firstName || ""}`;
}

/**
 * Type definition for outgoing speakers with structured fields.
 */
export type outgoing_speakers = [
  {
    id: "users.speaker_id";
    name: {
      first_name: "users.first_name";
      middle_name: "users.middle_name";
      last_name: "users.last_name";
      display_name: "users.display_name";
    };
    congregation: {
      id: "users.congregations_id";
      name: "users.congregations_name";
    };
    outlines: [{ id: "outlines.id"; name: "outlines.theme" }];
  },
];

