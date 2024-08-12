import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { SignIn } from "../../../features/auth/components/SignIn";
import { ThemeSelect } from "../components/ThemeSelect";
import { CreateCongregationPageLink } from "../../../app/generated/page-links/settings/CreateCongregationPageLinks";
import { BuildTime } from "../components/BuildTime";
import { CongregationDetailsPageLink } from "../../../app/generated/page-links/settings/CongregationDetailsPageLinks";
import { usePublisherQuery } from "../../people/queries/usePeople";
import { useSessionQuery } from "../../auth/queries/useSession";

const SettingsPage: React.FC = () => {
  const session = useSessionQuery();
  const publisher = usePublisherQuery(session.data?.user.id);
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
          <CreateCongregationPageLink.Item detail>
            <strong>Create Congregation:</strong>
          </CreateCongregationPageLink.Item>
          <CongregationDetailsPageLink.Item
            param={"/settings/congregation-details/" + publisher.data?.congregation_id}
          ></CongregationDetailsPageLink.Item>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
