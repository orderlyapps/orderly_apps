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
import { OutlinesList } from "@repo/lists/OutlinesList";

export default function OutlinesListPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Outlines List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonLoadingSpinner />}>
          <OutlinesList></OutlinesList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
