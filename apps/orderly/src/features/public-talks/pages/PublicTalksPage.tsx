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
import { useCongregationScheduleQuery } from "../../schedule/queries/useSchedule";
import { useSessionQuery } from "../../auth/queries/useSession";
import { usePublisherQuery } from "../../people/queries/usePublisherQuery";
import { TheocraticWeekItem } from "../../schedule/components/TheocraticWeekItem";
import { formatName } from "../../../util/string/formatName";

export default function PublicTalksPage() {
  const { data } = useSessionQuery();
  const { data: publisher } = usePublisherQuery(data?.user?.id);
  const { data: schedule } = useCongregationScheduleQuery(
    publisher?.congregation_id
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
            {getScheduleDates().map((week, index) => {
              const weekDetails = schedule?.find(
                ({ week: w }) => week.week === w
              );
              return (
                <TheocraticWeekItem key={index} week={week} index={index}>
                  <p>
                    <strong>Speaker: </strong>
                    <IonText color={"dark"}>
                      {formatName(
                        weekDetails?.public_talk_details
                          ? weekDetails.public_talk_details
                          : {},
                        { format: "display_last" }
                      )}
                    </IonText>
                  </p>
                  <p>
                    <strong>Theme:</strong>
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
