import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OutlinesListPageLink } from "../../page-links/home/OutlinesListPageLinks";

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
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
