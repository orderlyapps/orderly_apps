/**
 * Creates a search string from an object by concatenating the values of the given properties.
 *
 * @param obj The object to create the search string from.
 * @param properties The properties of the object to include in the search string.
 * @returns The search string.
 */
export const getSearchStringFromObject = (obj: any, properties: string[]) => {
  return properties
    .map((p) => obj[p]) // Get the values of the given properties
    .filter((s) => s) // Remove any falsy values (e.g. undefined, null, 0, "")
    .join(" "); // Concatenate the values with a space in between
};
