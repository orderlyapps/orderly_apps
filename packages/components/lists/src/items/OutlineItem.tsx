import { IonItem, IonLabel } from "@ionic/react";
import { Outline } from "@repo/supabase/types";

export function OutlineItem({ outline: { id, theme } }: { outline: Outline }) {
  return (
    <IonItem>
      <IonLabel>
        {id}.{" "}
        {theme}
      </IonLabel>
    </IonItem>
  );
}
