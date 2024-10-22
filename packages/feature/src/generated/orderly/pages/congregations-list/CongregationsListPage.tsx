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
import { CongregationsList } from "@repo/lists/CongregationsList";

export default function CongregationsListPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Congregations List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonLoadingSpinner />}>
          <CongregationsList></CongregationsList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
