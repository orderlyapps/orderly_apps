import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { PersonDetails } from "./PersonDetails";
import { useStore } from "../../../data/zustand/useStore";
import { useUpsertCongregationPublishersMutation } from "../queries/useUpsertCongregationPublishersMutation";

export function AddPersonModal() {
  const [isOpen, setIsOpen] = useState(false);
  const setStoreProperties = useStore.use.setStoreProperties();
  const personDetails = useStore.use.personDetails();

  const {
    mutateAsync: upsertPersonMutation,
    error,
    data,
  } = useUpsertCongregationPublishersMutation();

  const [toast] = useIonToast();
  const [showLoading, hideLoading] = useIonLoading();

  const handleDone = async () => {
    await showLoading();
    try {
      upsertPersonMutation(personDetails);
      await hideLoading();
      if (error) throw error;
      setIsOpen(false);
    } catch (error) {
      toast({
        message: "Sorry, something went wrong. Please try again.",
        duration: 2000,
        position: "bottom",
      });
    }
  };

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
            <IonButtons slot="start">
              <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>New Publisher</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleDone}>
                <strong>Done</strong>
              </IonButton>
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
