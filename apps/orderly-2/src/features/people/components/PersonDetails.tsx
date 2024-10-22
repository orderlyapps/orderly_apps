import { IonList } from "@ionic/react";
import { NameDetails } from "./NameDetails";
import { CongregationSelect } from "../../congregation/components/congregation-select/CongregationSelect";
import { useParams } from "react-router";
import { useStore } from "../../../data/zustand/useStore";
import { useEffect } from "react";
import { usePublisherQuery } from "../queries/usePublisherQuery";

export function PersonDetails(props: { readonly: boolean }) {
  const { id } = useParams<{ id: string }>();
  const { data: person } = usePublisherQuery(id);
  const setPersonDetails = useStore.use.setStoreProperties();
  const resetStoreProperty = useStore.use.resetStoreProperty();

  useEffect(() => {
    if (person) {
      setPersonDetails("personDetails", person);
      return;
    }
    resetStoreProperty("personDetails");
  }, [person]);

  return (
    <IonList inset>
      <NameDetails {...props}></NameDetails>
      <CongregationSelect {...props}></CongregationSelect>
    </IonList>
  );
}
