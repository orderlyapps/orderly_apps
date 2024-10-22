import { IonItem, IonLabel, IonNote, IonText } from "@ionic/react";
import buildTime from "../../../util/buildTime";

export const BuildTime = () => {
  return (
      <IonItem>
        <IonLabel><strong>Updated:</strong></IonLabel>

        <div className="ion-text-end ion-padding-vertical">
          <IonText>{buildTime.formattedBuildTime}</IonText>
          <br />
          <IonNote>{buildTime.timeDifference}</IonNote>
        </div>
      </IonItem>
  );
};
