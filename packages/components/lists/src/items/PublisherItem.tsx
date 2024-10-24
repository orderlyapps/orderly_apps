import { IonLabel } from "@ionic/react";
import { PublisherDetailsPageLinkItem } from "@repo/page-links/PublisherDetailsPageLinkItem";
import { Publisher } from "@repo/supabase/types";
import { formatName } from "@repo/utilities/formatName";

export function PublisherItem({ publisher }: { publisher: Publisher }) {


  return (
    <PublisherDetailsPageLinkItem param={{id: publisher.id}}>
      <IonLabel>
        <p>NAME: {formatName(publisher.name)}</p>
        <p>ID: {publisher.id}</p>
        <p>CONGREGATION: {publisher.congregation.name}</p>
      </IonLabel>
    </PublisherDetailsPageLinkItem>
  );
}
