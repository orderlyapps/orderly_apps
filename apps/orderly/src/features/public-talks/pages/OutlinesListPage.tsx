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
import OutlineSearch from '../components/outline-search';
import { LoadingSpinner } from '../../../ui/LoadingSpinner';

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
        <Suspense fallback={<LoadingSpinner />}>
         <OutlineSearch></OutlineSearch>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

// generated