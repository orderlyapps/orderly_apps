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
import { PeopleList } from "../../../../features/people/components/PeopleList";
import { LoadingSpinner } from "../../../../ui/LoadingSpinner";

export default function PublishersList() {
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
        <Suspense fallback={<LoadingSpinner />}>
          <PeopleList></PeopleList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
