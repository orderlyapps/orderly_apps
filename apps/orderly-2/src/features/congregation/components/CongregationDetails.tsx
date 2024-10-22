import { IonInput, IonItem } from "@ionic/react";
import { useStore } from "../../../data/zustand/useStore";

export function CongregationDetails({
  readonly = false,
}: {
  readonly?: boolean;
}) {
  const congregationDetails = useStore.use.congregationDetails();
  const setStoreProperties = useStore.use.setStoreProperties();

  const props = {
    onIonInput: (e: any) =>
      setStoreProperties("congregationDetails", {
        id: congregationDetails?.id,
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
          value={congregationDetails?.name || ""}
          name="name"
          {...props}
        />
      </IonItem>
    </>
  );
}
