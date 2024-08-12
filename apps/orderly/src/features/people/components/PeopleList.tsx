import { IonList } from "@ionic/react";
import { useData } from "../../../data/zustand/useData";
import { useEffect } from "react";

export function PeopleList() {
  const people = useData.use.people() ;
  const initTableData = useData.use.initTableData();

  useEffect(() => {
    initTableData("people");
  }, []);

  if (!people) return <div>No People Data</div>;
  return people.map((p) => {
    return <IonList key={p.id}>{p.full_name}</IonList>;
  });
}
