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
import { useCongregationDetailsPageParams } from "@repo/page-links/useCongregationDetailsPageParams";

export default function CongregationDetailsPage() {
  const { id } = useCongregationDetailsPageParams();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Congregation Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonLoadingSpinner />}>
          <div className="full centered">Congregation Details {id}</div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
