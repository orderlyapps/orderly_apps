/**
 * Sorts two objects by a set of keys that contain strings.
 *
 * @param a The first object to compare.
 * @param b The second object to compare.
 * @param keys The set of keys to use for sorting.
 * @returns A negative number if `a` comes first, a positive number if `b` comes first, and 0 if they are equal.
 */
export function sortStringsByKeys<T extends Record<string, any>>(a: T, b: T, keys: Array<keyof T>): number {
  // Iterate over the keys in order
  for (const key of keys) {
    // Get the values of the key for each object
    const aval = a[key];
    const bval = b[key];

    // If the values are not equal, return the result of the comparison
    if (aval < bval) return -1;
    if (aval > bval) return 1;
  }

  // If all values are equal, return 0
  return 0;
}
