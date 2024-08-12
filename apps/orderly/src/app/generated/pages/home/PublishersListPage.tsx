import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Suspense } from "react";
import { PeopleList } from "../../../../features/people/components/PeopleList";

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
        <Suspense fallback={<IonSpinner />}>
          <PeopleList></PeopleList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
