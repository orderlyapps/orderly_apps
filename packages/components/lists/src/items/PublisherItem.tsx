import { IonItem, IonLabel } from "@ionic/react";
import { Publisher } from "@repo/supabase/types";
import { formatName } from "@repo/utlities/formatName";

export function PublisherItem({ publisher }: { publisher: Publisher }) {

  return (
    <IonItem>
      <IonLabel>
        <p>NAME: {formatName(publisher.name)}</p>
        <p>ID: {publisher.id}</p>
        <p>CONGREGATION: {publisher.congregation.name}</p>
      </IonLabel>
    </IonItem>
  );
}
