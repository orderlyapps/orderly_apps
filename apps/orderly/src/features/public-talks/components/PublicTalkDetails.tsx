import { IonLabel } from "@ionic/react";
import { useStore } from "../../../data/zustand/useStore";
import AutocompleteModalItem, { Item } from "../../../ui/AutocompleteModalItem";
import { useSpeakersQuery } from "../queries/useSpeakersQuery";
import { formatName } from "../../../util/string/formatName";
import { useEffect, useState } from "react";
import { getSearchStringFromObject } from "../../../util/string/getSearchString";
import { useOutlinesQuery } from "../queries/useOutlinesQuery";

export function PublicTalkDetails({
  readonly = false,
}: {
  readonly?: boolean;
}) {
  const [congregations, setCongregations] = useState<Item[]>([]);
  const [speakers, setSpeakers] = useState<Item[]>([]);
  const [outlines, setOutlines] = useState<Item[]>([]);

  const publicTalkDetails = useStore.use.publicTalkDetails();
  const setStoreProperties = useStore.use.setStoreProperties();

  const { data: speakersList } = useSpeakersQuery();
  const { data: outlinesList } = useOutlinesQuery();

  const onCongregationSelect = (e: any) => {
    setStoreProperties("publicTalkDetails", {
      speakers_congregation_id: e.target.value.id,
      speakers_congregation_name: e.target.value.name,
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

      setCongregations(congregations);
      setSpeakers(speakers);
      setOutlines(outlines || []);
    }
  }, [speakersList, outlinesList]);

  return (
    <>
      <AutocompleteModalItem
        items={congregations}
        onSelect={onCongregationSelect}
        title={"Select Congregation"}
        readonly={readonly}
      >
        <IonLabel>Congregation:</IonLabel>
        {publicTalkDetails.speakers_congregation_name}
      </AutocompleteModalItem>

      <AutocompleteModalItem
        items={speakers}
        onSelect={onSpeakerSelect}
        title={"Select Speaker"}
        readonly={readonly}
      >
        <IonLabel>Speaker:</IonLabel>
        {formatName(publicTalkDetails)}
      </AutocompleteModalItem>

      <AutocompleteModalItem
        items={outlines}
        onSelect={onOutlineSelect}
        title={"Select Theme"}
        readonly={readonly}
      >
        <IonLabel>Outline:</IonLabel>
        {publicTalkDetails.theme}
      </AutocompleteModalItem>
    </>
  );
}
