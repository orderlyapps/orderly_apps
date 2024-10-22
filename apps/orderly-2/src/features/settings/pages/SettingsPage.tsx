import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { SignIn } from "../../auth/components/SignIn";
import { ThemeSelect } from "../components/ThemeSelect";
import { BuildTime } from "../components/BuildTime";

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SignIn></SignIn>
        <IonList inset>
          <BuildTime></BuildTime>
          <ThemeSelect></ThemeSelect>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
