// dexie.ts
import Dexie, { type EntityTable } from "dexie";

interface Person {
  id: string;
  first_name: string;
}

const dexie = new Dexie("orderly") as Dexie & {
  people: EntityTable<
  Person,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
dexie.version(1).stores({
  people: "id", // primary key "id" (for the runtime!)
});

export type { Person };
export { dexie };
