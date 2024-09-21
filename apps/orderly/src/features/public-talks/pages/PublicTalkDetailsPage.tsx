import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Suspense } from 'react';
import { LoadingSpinner } from "../../../ui/LoadingSpinner";

export default function PublicTalkDetailsPage() {
  return (
       <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Public Talk Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner />}>
         <div className='full centered'>Public Talk Details</div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

// generated