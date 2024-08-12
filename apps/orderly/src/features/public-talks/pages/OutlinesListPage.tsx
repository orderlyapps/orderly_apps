import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Suspense } from 'react';
import OutlineSearch from '../components/outline-search';

export default function OutlinesListPage() {
  return (
       <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Outlines List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonSpinner />}>
         <OutlineSearch></OutlineSearch>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

// generated