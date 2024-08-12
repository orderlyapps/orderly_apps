import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PublishersListPageLink } from "../../page-links/home/PublishersListLinks";
import { OutlinesListPageLink } from "../../page-links/home/OutlinesListPageLinks";
import { TestingPageLink } from "../../page-links/home/TestingPageLinks";

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
          <PublishersListPageLink.Item></PublishersListPageLink.Item>
          <OutlinesListPageLink.Item></OutlinesListPageLink.Item>
          <TestingPageLink.Item></TestingPageLink.Item>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
