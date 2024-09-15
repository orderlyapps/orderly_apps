import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OutlinesListPageLink } from "../../page-links/home/OutlinesListPageLinks";
import { PublishersListPageLink } from "../../page-links/home/PublishersListLinks";
import { RemindersPageLink } from "../../page-links/home/RemindersPageLinks";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Orderly</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Orderly</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <OutlinesListPageLink.Item></OutlinesListPageLink.Item>
          <PublishersListPageLink.Item></PublishersListPageLink.Item>
          <RemindersPageLink.Item></RemindersPageLink.Item>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
