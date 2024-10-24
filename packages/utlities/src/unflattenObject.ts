import { FlattenedObject, NestedObject } from "./flattenObject";

export function unflattenObject(flatObj: FlattenedObject): NestedObject {
  const result: NestedObject = {};

  for (const key in flatObj) {
    if (Object.prototype.hasOwnProperty.call(flatObj, key)) {
      const value = flatObj[key];
      const keys = key.split(".");
      let current: NestedObject = result;

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (i === keys.length - 1) {
          current[k] = value;
        } else {
          current[k] = current[k] || {};
          current = current[k] as NestedObject;
        }
      }
    }
  }

  return result;
}
