import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Suspense } from "react";
import { IonLoadingSpinner } from "@repo/ionic/IonLoadingSpinner";
import { OutlinesListPageLinkItem } from "@repo/page-links/OutlinesListPageLinkItem";
import { CongregationsListPageLinkItem } from "@repo/page-links/CongregationsListPageLinkItem";
import { PublishersListPageLinkItem } from "@repo/page-links/PublishersListPageLinkItem";
import { SpeakersListPageLinkItem } from "@repo/page-links/SpeakersListPageLinkItem";

export default function HomePage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonLoadingSpinner />}>
          <OutlinesListPageLinkItem></OutlinesListPageLinkItem>
          <CongregationsListPageLinkItem></CongregationsListPageLinkItem>
          <PublishersListPageLinkItem></PublishersListPageLinkItem>
          <SpeakersListPageLinkItem></SpeakersListPageLinkItem>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
