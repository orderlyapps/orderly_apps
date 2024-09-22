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
import { useCongregationScheduleQuery } from "../../schedule/queries/useSchedule";
import { useSessionQuery } from "../../auth/queries/useSession";
import { usePublisherQuery } from "../../people/queries/usePublisherQuery";
import { useStore } from "../../../data/zustand/useStore";
import { PublicTalkDetails } from "../components/PublicTalkDetails";
import { formatToTheocraticWeek } from "../../../util/dates/formatToTheocraticWeek";

export default function PublicTalkDetailsPage() {
  const [readonly, setReadonly] = useState(true);
  const online = useStore.use.online();

  const { id } = useParams<{ id: string }>();
  const { data: session } = useSessionQuery();
  const { data: publisher } = usePublisherQuery(session?.user?.id);
  const { data } = useCongregationScheduleQuery(publisher?.congregation_id);
  const setStoreProperties = useStore.use.setStoreProperties();

  const details = data?.find((d) => d.week === id);

  const handleCancel = async () => {
    if (details) {
      setStoreProperties("personDetails", details);
    }
    setReadonly(true);
  };

  function handleUpdate(): void {
    throw new Error("Function not implemented.");
  }

  useEffect(() => {
    if (details) {
      setStoreProperties("publicTalkDetails", details);
      return;
    }
    setStoreProperties("publicTalkDetails", "reset");
  }, [details]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {readonly && <IonBackButton></IonBackButton>}
            {!readonly && <IonButton onClick={handleCancel}>Cancel</IonButton>}
          </IonButtons>
          <IonTitle>{formatToTheocraticWeek(id)}</IonTitle>
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
          <IonList inset>
            <PublicTalkDetails readonly={readonly}></PublicTalkDetails>
          </IonList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
