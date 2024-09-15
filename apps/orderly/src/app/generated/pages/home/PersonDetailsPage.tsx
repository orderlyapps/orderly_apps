import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { Suspense, useEffect, useState } from "react";
import { LoadingSpinner } from "../../../../ui/LoadingSpinner";
import { PersonDetails } from "../../../../features/people/components/PersonDetails";
import { useStore } from "../../../../data/zustand/useStore";
import { useParams } from "react-router";
import { usePublisherQuery } from "../../../../features/people/queries/usePublisherQuery";
import { useUpsertCongregationPublishersMutation } from "../../../../features/people/queries/useUpsertCongregationPublishersMutation";

export default function PersonDetailsPage() {
  const [readonly, setReadonly] = useState(true);

  const setStoreProperties = useStore.use.setStoreProperties();
  const personDetails = useStore.use.personDetails();
  const online = useStore.use.online();

  const { id } = useParams<{ id: string }>();
  const { data: person } = usePublisherQuery(id);
  const {
    mutate: upsertPersonMutation,
    error,
    data,
  } = useUpsertCongregationPublishersMutation();

  const [toast] = useIonToast();
  const [showLoading, hideLoading] = useIonLoading();

  const handleUpdate = async () => {
    await showLoading();
    try {
      upsertPersonMutation(personDetails);
      await hideLoading();
      if (error) throw error;
      setReadonly(true);
    } catch (error) {
      toast({
        message: "Sorry, something went wrong. Please try again.",
        duration: 2000,
        position: "bottom",
      });
    }
  };

  const handleCancel = async () => {
    if (person) {
      setStoreProperties("personDetails", person);
    }
    setReadonly(true);
  };

  useEffect(() => {
    if (person) {
      setStoreProperties("personDetails", person);
    }
  }, [person]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {readonly && <IonBackButton></IonBackButton>}
            {!readonly && <IonButton onClick={handleCancel}>Cancel</IonButton>}
          </IonButtons>
          <IonTitle>Person Details</IonTitle>
          <IonButtons slot="end">
            {readonly && (
              <IonButton onClick={() => setReadonly(false)} disabled={!online}>
                <strong>Edit</strong>
              </IonButton>
            )}
            {!readonly && (
              <IonButton onClick={handleUpdate} disabled={!online}>
                <strong>Save</strong>
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner />}>
          <PersonDetails readonly={readonly}></PersonDetails>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
