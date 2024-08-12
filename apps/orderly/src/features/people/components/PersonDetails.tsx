import { IonList } from "@ionic/react";
import { NameDetails } from "./NameDetails";
import { CongregationSelect } from "../../congregation/components/CongregationSelect";

export function PersonDetails(props: { readonly: boolean }) {
  return (
    <IonList inset>
      <NameDetails {...props}></NameDetails>
      <CongregationSelect {...props}></CongregationSelect>
    </IonList>
  );
}
