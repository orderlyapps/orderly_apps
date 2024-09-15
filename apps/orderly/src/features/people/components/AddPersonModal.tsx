import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { PersonDetails } from "./PersonDetails";
import { useStore } from "../../../data/zustand/useStore";

export function AddPersonModal() {
  const [isOpen, setIsOpen] = useState(false);
  const setStoreProperties = useStore.use.setStoreProperties();

  useEffect(() => {
    setStoreProperties("personDetails", {});
  }, []);

  return (
    <>
      <IonButton onClick={() => setIsOpen(true)}>
        <IonIcon icon={addOutline} />
      </IonButton>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>New Publisher</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <PersonDetails readonly={false}></PersonDetails>
        </IonContent>
      </IonModal>
    </>
  );
}
