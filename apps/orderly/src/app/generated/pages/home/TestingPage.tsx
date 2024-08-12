import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Suspense } from "react";
import { CongregationsList } from "../../../../features/congregation/components/CongregationsList";
import { useStore } from "../../../../data/zustand/useStore";
import { LoadingSpinner } from "../../../../ui/LoadingSpinner";
import { usePublishersQuery } from "../../../../features/people/queries/usePeople";

export default function TestingPage() {
  const publishers = usePublishersQuery()
  const person = useStore.use.personDetails();
  const cong = useStore.use.congregationDetails();
  const setStoreProperty = useStore.use.setStoreProperties();

  
  const handleTest = () => {
    console.log("test:", publishers);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Testing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonSpinner />}>
          {/* <CongregationDetails></CongregationDetails> */}
          <IonButton onClick={handleTest} expand="full">
            Test
          </IonButton>
          <CongregationsList></CongregationsList>
          <LoadingSpinner></LoadingSpinner>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
