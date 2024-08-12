import { IonCheckbox, IonItem } from "@ionic/react";
import { useEffect } from "react";
import { useData } from "../../../data/zustand/useData";
import { useCongregationsQuery } from "../queries/useCongregations";
import { LoadingSpinner } from "../../../ui/LoadingSpinner";

export function CongregationsList() {
  const { data: congregations, isLoading } = useCongregationsQuery();

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <>
      {congregations?.map((c: any) => {
        return (
          <IonItem key={c.id}>
            <IonCheckbox justify="space-between">{c.name}</IonCheckbox>
          </IonItem>
        );
      })}
    </>
  );
}
