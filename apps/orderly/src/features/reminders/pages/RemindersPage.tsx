import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Suspense } from "react";
import { LoadingSpinner } from "../../../ui/LoadingSpinner";

export default function RemindersPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Reminders</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner />}>
          <IonList inset>
            <a
              href={
                "sms:?body=Hi,%0ALooking forward to your talk on Saturday. Here are the details...%0A%0ATIME: 3pm%0A%0ALOCATION: 104 Collinson St, Tenambit NSW 2323%0A%0Ahttps://maps.app.goo.gl/ZbZr8FoJgebvJTnk6%0A%0AMEDIA: bencizzio@live.com.au"
              }
            >
              <IonButton expand="block">Public Speaker</IonButton>
            </a>
          </IonList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
