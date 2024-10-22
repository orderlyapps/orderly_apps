import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Suspense, useEffect, useState } from "react";
import { LoadingSpinner } from "../../../ui/LoadingSpinner";
import { useParams } from "react-router";
import { useStore } from "../../../data/zustand/useStore";
import { PublicTalkDetails } from "../components/PublicTalkDetails";
import { formatToTheocraticWeek } from "../../../util/dates/formatToTheocraticWeek";
import { useAppState } from "../../../data/zustand/useAppState";
import { useUpsertPublicTalkAssignmentMutation } from "../queries/useUpsertPublicTalkAssignmentMutation";
import { usePublicTalkAssignmentDetailsQuery } from "../queries/usePublicTalkAssignmentDetailsQuery";

export default function PublicTalkDetailsPage() {
  const [readonly, setReadonly] = useState(true);

  const { week } = useParams<{ week: string }>();
  const {
    canEdit,
    user: { data: userData },
    setStoreProperties,
  } = useAppState();

  const { data: schedule } = usePublicTalkAssignmentDetailsQuery(
    userData?.congregation_id
  );
  const publicTalkDetails = useStore.use.publicTalkDetails();

  const { mutate } = useUpsertPublicTalkAssignmentMutation();

  const details = schedule?.find((d) => d.week === week);

  const handleCancel = async () => {
    if (details) {
      setStoreProperties("personDetails", details);
    }
    setReadonly(true);
  };

  function handleUpdate(): void {
    mutate(publicTalkDetails);
    setReadonly(true);
  }

  useEffect(() => {
    if (details) {
      setStoreProperties("publicTalkDetails", details);
      return;
    }
    setStoreProperties("publicTalkDetails", "reset");
    setStoreProperties("publicTalkDetails", {
      week,
      congregation_id: userData?.congregation_id,
    });
  }, [details]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {readonly && <IonBackButton></IonBackButton>}
            {!readonly && <IonButton onClick={handleCancel}>Cancel</IonButton>}
          </IonButtons>
          <IonTitle>{formatToTheocraticWeek(week)}</IonTitle>
          <IonButtons slot="end">
            {readonly && (
              <IonButton onClick={() => setReadonly(false)} disabled={!canEdit}>
                <strong>Edit</strong>
              </IonButton>
            )}
            {!readonly && (
              <IonButton onClick={handleUpdate} disabled={!canEdit}>
                <strong>Save</strong>
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner />}>
          <IonList inset>
            <PublicTalkDetails readonly={readonly}></PublicTalkDetails>
          </IonList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
