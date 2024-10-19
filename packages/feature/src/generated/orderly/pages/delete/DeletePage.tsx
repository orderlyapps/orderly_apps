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
import { useParams } from "react-router";

export default function DeletePage() {
  const result = useParams();

  console.log("DeletePage  result:", result)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Delete</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonLoadingSpinner />}>
          <div className="full centered">Delete</div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
