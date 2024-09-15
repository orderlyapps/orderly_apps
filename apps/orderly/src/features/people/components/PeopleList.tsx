import { IonItem, IonList } from "@ionic/react";
import { useCongregationPublishersQuery } from "../queries/useCongregationPublishersQuery";
import { usePublisherQuery } from "../queries/usePublisherQuery";
import { useSessionQuery } from "../../auth/queries/useSession";
import { PersonDetailsPageLink } from "../../../app/generated/page-links/home/PersonDetailsPageLinks";

export function PeopleList() {
  const { data } = useSessionQuery();
  const { data: publisher } = usePublisherQuery(data?.user.id);
  const { data: congregation } = useCongregationPublishersQuery(
    publisher?.congregation_id
  );

  if (!congregation) return <div>No People Data</div>;
  return congregation.map((p) => {
    return (
      <IonList key={p.id}>
        <PersonDetailsPageLink.Item param={p.id}>
          {p.full_name}
        </PersonDetailsPageLink.Item>
      </IonList>
    );
  });
}
