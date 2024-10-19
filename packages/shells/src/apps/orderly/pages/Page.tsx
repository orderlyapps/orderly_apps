import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonLoadingSpinner } from "@repo/ionic/IonLoadingSpinner";
import { Suspense } from "react";

export default function Page() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonLoadingSpinner />}>
          <div className="full centered"></div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
