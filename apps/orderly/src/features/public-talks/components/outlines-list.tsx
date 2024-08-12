import { IonItem, IonLabel } from "@ionic/react";
import { OUTLINES } from "../helpers/outlines";

export const OutlinesList = () => {
  return (
    <>
      {OUTLINES.map((outline) => (
        <IonItem key={outline.number} className="outline">
          <IonLabel class="ion-text-nowrap">
            <strong className="outline-number">{outline.number} - </strong>
            {outline.title}
          </IonLabel>
        </IonItem>
      ))}
    </>
  );
};

export default OutlinesList;
