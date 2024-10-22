import { IonItem, IonLabel } from "@ionic/react";
import { Speaker } from "@repo/supabase/types";
import { formatName } from "@repo/utlities/formatName";
import { sortStringsNumerically } from "@repo/utlities/sortStringsNumerically";

export function SpeakerItem({ speaker }: { speaker: Speaker }) {
  return (
    <IonItem>
      <IonLabel>
        <p>Name: {formatName(speaker.name, { format: "display last" })}</p>
        <p>Congregation: {speaker.congregation.name}</p>
        <p>Availability: {speaker.availability} weeks</p>
        <ul>
          {speaker.outlines
            .sort((a, b) => sortStringsNumerically(a, b, "id"))
            .map((outline) => (
              <p key={outline.id}>
                {outline.id}. {outline.theme}
              </p>
            ))}
        </ul>
      </IonLabel>
    </IonItem>
  );
}
