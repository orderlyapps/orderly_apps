import { useOutlinesQuery } from "@repo/react-query/useOutlinesQuery";
import { OutlineItem } from "./items/OutlineItem";

export function OutlinesList() {
  const { data: outlines } = useOutlinesQuery();

  const items = outlines?.map((outline) => {
    return <OutlineItem key={outline.id} outline={outline}></OutlineItem>;
  });

  return items;
}
