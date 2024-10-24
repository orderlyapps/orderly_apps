import { usePublisherDetailsPageParams } from "@repo/page-links/usePublisherDetailsPageParams";
import { useStore } from "@repo/zustand/useStore";
import { test } from "@repo/react-query/test";
import { usePublisherQuery } from "@repo/react-query/usePublisherQuery";
import { usePublishersQuery } from "@repo/react-query/usePublishersQuery";

export function PublishersDetails(
  {
    // publisher,
    // readonly = false,
  }: {
    // publisher: Publisher;
    // readonly?: boolean;
  }
) {
  const sfdg = usePublisherDetailsPageParams();
  const {data} = usePublisherQuery(sfdg.id);
  const adf = usePublishersQuery()

  const sfdgd = test;
  console.log("sfdg:", adf);

  const setStoreProperties = useStore.use.setStoreProperties();

  // const props = {
  //   onIonInput: (e: any) =>
  //     setStoreProperties("publisherDetails", {
  //       [e.target.name]: e.target.value,
  //     }),
  //   clearInput: true,
  //   readonly,
  //   className: "ion-text-end",
  // };
  return <div>{test}</div>;
}
