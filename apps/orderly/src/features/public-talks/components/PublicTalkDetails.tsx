import { IonItem, IonLabel } from "@ionic/react";
import { useStore } from "../../../data/zustand/useStore";
import { formatName } from "../../../util/string/formatName";

export function PublicTalkDetails({
  readonly = false,
}: {
  readonly?: boolean;
}) {
  const details = useStore.use.publicTalkDetails();
  const setStoreProperties = useStore.use.setStoreProperties();

  const props = {
    onIonInput: (e: any) =>
      setStoreProperties("publicTalkDetails", {
        week: details?.week,
        congregation_id: details?.congregation_id,
        [e.target.name]: e.target.value,
      }),
    clearInput: true,
    readonly,
    className: "ion-text-end",
  };

  return (
    <>
      <IonItem>
        <IonLabel>Speaker:</IonLabel>
        <p>{formatName(details, { format: "display_last" })}</p>
      </IonItem>
      <IonItem>
        <IonLabel>Theme:</IonLabel>
        <p>{details.theme}</p>
      </IonItem>
      <IonItem>
        <IonLabel>Congregation:</IonLabel>
        <p>{details.home_congregation_name}</p>
      </IonItem>
    </>
  );
}
