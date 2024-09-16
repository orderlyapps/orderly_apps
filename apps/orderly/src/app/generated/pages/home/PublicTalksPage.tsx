import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Fragment, Suspense } from "react";
import { LoadingSpinner } from "../../../../ui/LoadingSpinner";
import { previousMonday } from "../../../../util/dates/previousMonday";
import { getScheduleDates } from "../../../../util/dates/getScheduleDates";
import { formatToTheocraticWeek } from "../../../../util/dates/formatToTheocraticWeek";
import { PublicTalkSelectModal } from "../../../../features/public-talks/components/PublicTalkSelectModal";

export default function PublicTalksPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Public Talks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner />}>
          <IonList>
            {getScheduleDates(previousMonday()).map((week, index) => {
              const date = new Date(week);
              const month = date.toLocaleString("default", { month: "long" });
              const prevMonth =
                index > 0
                  ? new Date(
                      getScheduleDates(previousMonday())[index - 1]
                    ).toLocaleString("default", { month: "long" })
                  : "";
              return (
                <Fragment key={week}>
                  {month !== prevMonth && (
                    <IonItemDivider
                      className={"ion-margin-top-xxx ion-padding"}
                    >
                      <IonLabel>
                        <h1>{month}</h1>
                      </IonLabel>
                    </IonItemDivider>
                  )}
                  <PublicTalkSelectModal week={week} />
                </Fragment>
              );
            })}
          </IonList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
