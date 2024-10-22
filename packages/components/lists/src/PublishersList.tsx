import { sortStringsByKeys } from "@repo/utlities/sortStringsByKeys";
import { PublisherItem } from "./items/PublisherItem";
import { usePublishersQuery } from "@repo/react-query/usePublishersQuery";

export function PublishersList() {
  const { data: publishers } = usePublishersQuery();

  const items = publishers
    ?.sort((a, b) =>
      sortStringsByKeys(a.name, b.name, ["last_name", "display_name"])
    )
    .map((publisher) => {
      return (
        <PublisherItem key={publisher.id} publisher={publisher}></PublisherItem>
      );
    });

  return items;
}
