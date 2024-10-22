/**
 * Sorts two objects by a key that contains a string that is possibly a number.
 *
 * If the string is a number, it is sorted numerically.
 * If the string is not a number, it is sorted alphabetically.
 *
 * If one of the strings is a number and the other is not, the number comes first.
 *
 * @param a The first object to compare.
 * @param b The second object to compare.
 * @param key The key to use for sorting.
 * @returns A negative number if a comes first, a positive number if b comes first, and 0 if they are equal.
 */
export function sortStringsNumerically<T>(a: T, b: T, key: keyof T): number {
  const aVal = a[key] as string;
  const bVal = b[key] as string;
  const aNum = Number(aVal);
  const bNum = Number(bVal);

  if (isNaN(aNum) && isNaN(bNum)) {
    // If both values are not numbers, sort alphabetically
    return aVal.localeCompare(bVal);
  }

  if (!isNaN(aNum) && !isNaN(bNum)) {
    // If both values are numbers, sort numerically
    return aNum - bNum;
  }

  // If one value is a number and the other is not, the number comes first
  return isNaN(aNum) ? 1 : -1;
}
