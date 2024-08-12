import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { Suspense, useEffect, useState } from "react";
import { useStore } from "../../../data/zustand/useStore";
import { PersonDetails } from "../../../features/people/components/PersonDetails";
import { useSessionQuery } from "../../auth/queries/useSession";
import { usePublisherQuery, useUpsertPersonMutation } from "../queries/usePeople";

export default function ProfilePage() {
  const [readonly, setReadonly] = useState(true);
  const session = useSessionQuery();
  const online = useStore.use.online();
  const { data: person } = usePublisherQuery(session.data?.user.id);
  const {
    mutate: upsertPersonMutation,
    error,
    data,
  } = useUpsertPersonMutation();
  const personDetails = useStore.use.personDetails();
  const setStoreProperties = useStore.use.setStoreProperties();

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
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {readonly && <IonBackButton></IonBackButton>}
            {!readonly && <IonButton onClick={handleCancel}>Cancel</IonButton>}
          </IonButtons>
          <IonTitle>Profile</IonTitle>

          <IonButtons slot="end">
            {readonly && (
              <IonButton onClick={() => setReadonly(false)} disabled={!online}>
                <strong>Edit</strong>
              </IonButton>
            )}
            {!readonly && (
              <IonButton onClick={handleUpdate} disabled={!online}>
                <strong>Done</strong>
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonSpinner />}>
          {session.data && <PersonDetails readonly={readonly}></PersonDetails>}
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
