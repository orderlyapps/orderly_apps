import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { formatToTheocraticWeek } from "../../../util/dates/formatToTheocraticWeek";
import { getSaturdayOfWeek } from "../../../util/dates/getSaturdayOfWeek";
import { formatDateForSMS } from "../../../util/dates/formatDateForSMS";

export function PublicTalkSelectModal({ week }: { week: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const message = encodeURIComponent(
    `Hi xxxxxx,\nJust wondering if you have any speakers available to come to Maitland on ${formatDateForSMS(new Date(getSaturdayOfWeek(week)))}\n😊`
  );

  return (
    <>
      <IonItem onClick={() => setIsOpen(true)}>
        <IonLabel>
          <strong>{formatToTheocraticWeek(week)}</strong>
          <p>
            Speaker: <strong>Speaker Name</strong>
          </p>
          <p>Theme:</p>
        </IonLabel>
      </IonItem>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{formatToTheocraticWeek(week)}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonInput label={"Speaker Name"}></IonInput>
            </IonItem>
            <IonItem href={`sms:&body=${message}`} target="_blank">
              <IonLabel>Request Speaker via SMS</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
}
