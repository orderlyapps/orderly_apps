import { CongregationItem } from "./items/CongregationItem";
import { useCongregationsQuery } from "@repo/react-query/useCongregationsQuery";

export function CongregationsList() {
  const { data: congregations } = useCongregationsQuery();

  const items = congregations?.map((congregation) => {
    return (
      <CongregationItem
        key={congregation.id}
        congregation={congregation}
      ></CongregationItem>
    );
  });

  return items;
}
