import { IonList } from "@ionic/react";
import { NameDetails } from "./NameDetails";
import { CongregationSelect } from "../../congregation/components/CongregationSelect";
import { useParams } from "react-router";
import { usePublisherQuery } from "../queries/usePeople";
import { useStore } from "../../../data/zustand/useStore";
import { useEffect } from "react";

export function PersonDetails(props: { readonly: boolean }) {
  const { id } = useParams<{ id: string }>();
  const { data: person } = usePublisherQuery(id);
  const setUser = useStore.use.setStoreProperties();

  useEffect(() => {
    if (person) {
      setUser("user", person);
    }
  }, []);

  return (
    <IonList inset>
      <NameDetails {...props}></NameDetails>
      <CongregationSelect {...props}></CongregationSelect>
    </IonList>
  );
}
