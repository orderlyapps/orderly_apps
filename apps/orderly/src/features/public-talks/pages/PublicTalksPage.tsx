import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Suspense } from "react";
import { LoadingSpinner } from "../../../ui/LoadingSpinner";
import { getScheduleDates } from "../../../util/dates/getScheduleDates";
import { TheocraticWeekItem } from "../../schedule/components/TheocraticWeekItem";
import { formatName } from "../../../util/string/formatName";
import { PATHS } from "../../../app/generated/util/paths";
import { usePublicTalkAssignmentDetailsQuery } from "../queries/usePublicTalkAssignmentDetailsQuery";
import { useAppState } from "../../../data/zustand/useAppState";

export default function PublicTalksPage() {
  const {
    user: { data: user },
  } = useAppState();
  const { data: publicTalkAssignments } = usePublicTalkAssignmentDetailsQuery(
    user?.congregation_id
  );

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
            {getScheduleDates().map((date, index) => {
              const weekDetails = publicTalkAssignments?.find(
                ({ week }) => date.week === week
              );
              return (
                <TheocraticWeekItem
                  key={index}
                  week={date}
                  index={index}
                  routerLink={PATHS.public_talk_details + `/${date.week}`}
                >
                  <p>
                    <strong>Speaker: </strong>
                    <IonText color={"dark"}>
                      {weekDetails &&
                        formatName(weekDetails, { format: "display_last" })}
                    </IonText>
                  </p>
                  <p>
                    <strong>Theme: </strong>
                    <IonText color={"dark"}>
                      {weekDetails && weekDetails.theme}
                    </IonText>
                  </p>
                </TheocraticWeekItem>
              );
            })}
          </IonList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
