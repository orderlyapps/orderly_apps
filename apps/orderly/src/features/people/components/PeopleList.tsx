import { IonItem, IonList } from "@ionic/react";
import { useCongregationPublishersQuery } from "../queries/useCongregationPublishersQuery";
import { usePublisherQuery } from "../queries/usePublisherQuery";
import { useSessionQuery } from "../../auth/queries/useSession";
import { PersonDetailsPageLink } from "../../../app/generated/page-links/home/PersonDetailsPageLinks";
import { formatDisplayName } from "../helpers/formatDisplayName";

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
          {formatDisplayName(p)}
        </PersonDetailsPageLink.Item>
      </IonList>
    );
  });
}
