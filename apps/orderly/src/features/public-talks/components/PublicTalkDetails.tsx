import { IonLabel } from "@ionic/react";
import { useStore } from "../../../data/zustand/useStore";
import AutocompleteModalItem, { Item } from "../../../ui/AutocompleteModalItem";
import { useSpeakersQuery } from "../queries/useSpeakersQuery";
import { useAppState } from "../../../data/zustand/useAppState";
import { formatName } from "../../../util/string/formatName";
import { useEffect, useState } from "react";
import { getSearchStringFromObject } from "../../../util/string/getSearchString";
import { search } from "ionicons/icons";
import { useOutlinesQuery } from "../queries/useOutlinesQuery";

export function PublicTalkDetails({
  readonly = false,
}: {
  readonly?: boolean;
}) {
  const [items, setItems] = useState<{
    congregations: Item[];
    speakers: Item[];
    outlines: Item[];
  }>({
    congregations: [],
    speakers: [],
    outlines: [],
  });

  const { setStoreProperties } = useAppState();
  const publicTalkDetails = useStore.use.publicTalkDetails();

  const { data: speakersList } = useSpeakersQuery();
  const { data: outlinesList } = useOutlinesQuery();

  const onCongregationSelect = (e: any) => {
    setStoreProperties("publicTalkDetails", {
      home_congregation_id: e.target.value.id,
      home_congregation_name: e.target.value.name,
      display_name: null,
      middle_name: null,
      first_name: null,
      last_name: null,
      outline_id: null,
      theme: null,
    });
  };

  const onSpeakerSelect = (e: any) => {
    setStoreProperties("publicTalkDetails", {
      display_name: e.target.value.data.display_name,
      middle_name: e.target.value.data.middle_name,
      first_name: e.target.value.data.first_name,
      last_name: e.target.value.data.last_name,
      speaker_id: e.target.value.id,
      outline_id: null,
      theme: null,
    });
  };
  const onOutlineSelect = (e: any) => {
    setStoreProperties("publicTalkDetails", {
      outline_id: e.target.value.id,
      theme: e.target.value.name,
    });
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

      const speakers = speakersList?.map((s) => ({
        name: formatName(s) || "",
        id: s.id,
        component: null,
        data: s,
        searchString: getSearchStringFromObject(s, [
          "first_name",
          "last_name",
          "middle_name",
          "display_name",
          "home_congregation_name",
        ]),
      }));

      const outlines = outlinesList?.map((outline) => {
        return {
          name: outline.theme,
          id: outline.id,
          component: null,
          data: null,
          searchString: outline.theme,
        };
      });

      setItems({ congregations, speakers, outlines: outlines || [] });
    }
  }, [speakersList, outlinesList]);

  return (
    <>
      <AutocompleteModalItem
        items={items.congregations}
        onSelect={onCongregationSelect}
        title={"Select Congregation"}
        name="home_congregation_id"
        readonly={readonly}
      >
        <IonLabel>Congregation:</IonLabel>
        {publicTalkDetails.home_congregation_name}
      </AutocompleteModalItem>

      <AutocompleteModalItem
        items={items.speakers}
        onSelect={onSpeakerSelect}
        title={"Select Speaker"}
        name="speaker_id"
        readonly={readonly}
      >
        <IonLabel>Speaker:</IonLabel>
        {formatName(publicTalkDetails)}
      </AutocompleteModalItem>

      <AutocompleteModalItem
        items={items.outlines}
        onSelect={onOutlineSelect}
        title={"Select Theme"}
        name="outline_id"
        readonly={readonly}
      >
        <IonLabel>Outline:</IonLabel>
        {publicTalkDetails.theme}
      </AutocompleteModalItem>
    </>
  );
}
