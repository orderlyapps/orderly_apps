import { IonInput, IonItem } from "@ionic/react";
import { useStore } from "../../../data/zustand/useStore";

export function NameDetails({ readonly = false }: { readonly?: boolean }) {
  const personDetails = useStore.use.personDetails();
  const setStoreProperties = useStore.use.setStoreProperties();

  const props = {
    onIonInput: (e: any) =>
      setStoreProperties("personDetails", {
        id: personDetails?.id,
        [e.target.name]: e.target.value,
      }),
    clearInput: true,
    readonly,
    className: "ion-text-end",
  };
  return (
    <>
      <IonItem>
        <IonInput
          label="First Name:"
          value={personDetails?.first_name || ""}
          name="first_name"
          {...props}
        />
      </IonItem>

      <IonItem>
        <IonInput
          label="Middle Name:"
          value={personDetails?.middle_name || ""}
          name="middle_name"
          {...props}
        />
      </IonItem>

      <IonItem>
        <IonInput
          label="Last Name:"
          value={personDetails?.last_name || ""}
          name="last_name"
          {...props}
        />
      </IonItem>

      <IonItem>
        <IonInput
          label="Display Name:"
          value={personDetails?.display_name || ""}
          name="display_name"
          {...props}
        />
      </IonItem>
    </>
  );
}
