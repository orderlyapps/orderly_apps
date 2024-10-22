import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Suspense } from "react";
import { CongregationsList } from "../../../../features/congregation/components/CongregationsList";
import { useStore } from "../../../../data/zustand/useStore";
import { LoadingSpinner } from "../../../../ui/LoadingSpinner";
import { DownloadPDF, savePDF } from "../../../../features/pdf/PDF";

export default function TestingPage() {
  const person = useStore.use.personDetails();
  const cong = useStore.use.congregationDetails();
  const setStoreProperty = useStore.use.setStoreProperties();

  const handleTest = () => {
    savePDF();
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
        <Suspense fallback={<LoadingSpinner />}>
          {/* <CongregationDetails></CongregationDetails> */}
          <IonButton onClick={handleTest} expand="full">
            Test
          </IonButton>
          <CongregationsList></CongregationsList>
          <LoadingSpinner></LoadingSpinner>
          <DownloadPDF></DownloadPDF>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
