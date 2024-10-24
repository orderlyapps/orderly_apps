import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Suspense } from "react";
import { IonLoadingSpinner } from "@repo/ionic/IonLoadingSpinner";
import { useSpeakerDetailsPageParams } from "@repo/page-links/useSpeakerDetailsPageParams";

export default function SpeakerDetailsPage() {
  const { id } = useSpeakerDetailsPageParams();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Speaker Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonLoadingSpinner />}>
          <div className="full centered">Speaker Details {id}</div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
