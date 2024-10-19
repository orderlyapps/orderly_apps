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
import { DeletePageLinkItem } from "../delete/DeletePageLinkItem";

export default function HomePage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonLoadingSpinner />}>
          <DeletePageLinkItem param={"check"}></DeletePageLinkItem>
          <div className="full centered">Home</div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
