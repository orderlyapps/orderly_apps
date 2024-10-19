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
import { IonLoadingSpinner } from "@repo/ionic/IonLoadingSpinner";

export default function SettingsPage() {
  return (
       <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonLoadingSpinner />}>
         <div className='full centered'>Settings</div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

// generated