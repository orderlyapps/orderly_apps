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
import { PeopleList } from "../components/PeopleList";
import { LoadingSpinner } from "../../../ui/LoadingSpinner";
import { AddPersonModal } from "../components/AddPersonModal";

export default function PublishersList() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Publishers List</IonTitle>
          <IonButtons slot="end">
            <AddPersonModal></AddPersonModal>
          </IonButtons>
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
