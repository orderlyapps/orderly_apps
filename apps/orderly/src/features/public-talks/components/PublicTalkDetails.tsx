import { IonLabel } from "@ionic/react";
import { useStore } from "../../../data/zustand/useStore";
import AutocompleteModalItem, { Item } from "../../../ui/AutocompleteModalItem";
import { useSpeakersQuery } from "../queries/useSpeakersQuery";
import { useAppState } from "../../../data/zustand/useAppState";
import { formatName } from "../../../util/string/formatName";
import { useEffect, useState } from "react";
import { getSearchStringFromObject } from "../../../util/string/getSearchString";

export function PublicTalkDetails({
  readonly = false,
}: {
  readonly?: boolean;
}) {
  const { setStoreProperties } = useAppState();
  const [congregations, setCongregations] = useState<Item[]>([]);
  const publicTalkDetails = useStore.use.publicTalkDetails();

  const { data: speakersList } = useSpeakersQuery();

  const speakers = speakersList?.map((s) => ({
    name: formatName(s) || "",
    id: s.id,
    component: null,
    data: s,
  }));

  const outlines = speakersList?.map((s) => ({
    name: s.congregation_name || "",
    id: s.id,
    component: null,
    data: s,
  }));

  const onSelect = (e: any) => {
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
    setStoreProperties("publicTalkDetails", {});
  };

  useEffect(() => {
    if (speakersList) {
      const congregations = speakersList
        ? Array.from(new Set(speakersList.map((s) => s.congregation_id))).map(
            (id) => {
              const name =
                speakersList.find((s) => s.congregation_id === id)
                  ?.congregation_name || "";
              return {
                name,
                id,
                component: null,
                data: null,
                searchString: name,
              };
            }
          )
        : [];
      setCongregations(congregations);
    }
  }, [speakersList]);

  return (
    <>
      <AutocompleteModalItem
        items={congregations}
        onSelect={onSelect}
        title={"Select Congregation"}
        name="home_congregation_id"
        readonly={readonly}
      >
        <IonLabel>Congregation:</IonLabel>
        {publicTalkDetails.home_congregation_name}
      </AutocompleteModalItem>

      {/* <AutocompleteModalItem
        items={speakers}
        onSelect={onSelect}
        title={"Select Speaker"}
        name="speaker_id"
        readonly={readonly}
      >
        <IonLabel>Speaker:</IonLabel>
        {formatName(publicTalkDetails)}
      </AutocompleteModalItem>

      <AutocompleteModalItem
        items={outlines}
        onSelect={onSelect}
        title={"Select Theme"}
        name="outline_id"
        readonly={readonly}
      >
        <IonLabel>Outline:</IonLabel>
        {publicTalkDetails.theme}
      </AutocompleteModalItem> */}
    </>
  );
}
