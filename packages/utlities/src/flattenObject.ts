export type Primitive = string | number | boolean | null | undefined;
export type NestedObject = { [key: string]: Primitive | NestedObject };
export type FlattenedObject = { [key: string]: Primitive };

export function flattenObject(
  obj: NestedObject,
  parentKey: string = "",
  result: FlattenedObject = {}
): FlattenedObject {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        flattenObject(value as NestedObject, newKey, result);
      } else {
        result[newKey] = value as Primitive;
      }
    }
  }
  return result;
}


