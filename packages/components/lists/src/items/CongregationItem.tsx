import { IonItem, IonLabel } from "@ionic/react";
import { Congregation } from "@repo/supabase/types";

export function CongregationItem({
  congregation: { id, name },
}: {
  congregation: Congregation;
}) {
  return (
    <IonItem>
      <IonLabel>
        <p>NAME: {name}</p>
        <p>ID: {id}</p>
      </IonLabel>
    </IonItem>
  );
}
