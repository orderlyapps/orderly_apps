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
import { PublishersList } from "@repo/lists/PublishersList";

export default function PublishersListPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Publishers List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonLoadingSpinner />}>
          <PublishersList></PublishersList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
