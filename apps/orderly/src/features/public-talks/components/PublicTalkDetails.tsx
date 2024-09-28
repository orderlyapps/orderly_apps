import { IonItem, IonLabel } from "@ionic/react";
import { useStore } from "../../../data/zustand/useStore";
import { formatName } from "../../../util/string/formatName";
import AutocompleteModalItem from "../../../ui/AutocompleteModalItem";
import { useSpeakersQuery } from "../queries/useSpeakersQuery";
import { useAppState } from "../../../data/zustand/useAppState";

export function PublicTalkDetails({
  readonly = false,
}: {
  readonly?: boolean;
}) {
  const appState = useAppState();


  const publicTalkDetails = useStore.use.publicTalkDetails();

  const setStoreProperties = useStore.use.setStoreProperties();
  const { data: speakers } = useSpeakersQuery();

  const congregations = speakers?.map((s) => ({
    name: s.congregation_name || "",
    id: s.id,
    component: null,
    data: s,
  }));

  // const props = {
  //   onIonInput: (e: any) =>
  //     setStoreProperties("publicTalkDetails", {
  //       week: details?.week,
  //       congregation_id: details?.congregation_id,
  //       [e.target.name]: e.target.value,
  //     }),
  //   clearInput: true,
  //   readonly,
  //   className: "ion-text-end",
  // };

  const onSelect = (e: any) => {
    console.log("onSelect  e:", e.target.value.data);
    setStoreProperties("publicTalkDetails", {});
  };

  return (
    <>
      <AutocompleteModalItem
        items={congregations}
        onSelect={onSelect}
        title={"Select congregation"}
        name="home_congregation_name"
      >
        <IonLabel>Congregation:</IonLabel>
        {publicTalkDetails.home_congregation_name}
      </AutocompleteModalItem>

      {/* <AutocompleteModalItem
        items={items}
        onSelect={onSelect}
        title={"Select speaker"}
        name="home_congregation_name"
      >
        <IonLabel>Speaker:</IonLabel>
        {details.home_congregation_name}
      </AutocompleteModalItem>

      <AutocompleteModalItem
        items={items}
        onSelect={onSelect}
        title={"Select speaker"}
        name="home_congregation_name"
      >
        <IonLabel>Theme:</IonLabel>
        {details.home_congregation_name}
      </AutocompleteModalItem> */}
    </>
  );
}
