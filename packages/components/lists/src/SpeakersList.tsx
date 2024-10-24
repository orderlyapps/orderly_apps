import { sortStringsByKeys } from "@repo/utilities/sortStringsByKeys";
import { SpeakerItem } from "./items/SpeakerItem";
import { useSpeakersQuery } from "@repo/react-query/useSpeakersQuery";

export function SpeakersList() {
  const { data: speaker } = useSpeakersQuery();

  const items = speaker
    ?.sort((a, b) =>
      sortStringsByKeys(a.name, b.name, ["last_name", "display_name"])
    )
    .map((speaker) => {
      return <SpeakerItem key={speaker.id} speaker={speaker}></SpeakerItem>;
    });

  return items;
}
