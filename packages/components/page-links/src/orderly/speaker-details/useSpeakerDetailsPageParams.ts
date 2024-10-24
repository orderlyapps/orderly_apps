import { useParams } from "react-router";

export const QUERY_PLACEHOLDER = "speakerDetails";

const SPEAKER_DETAILS_PAGE_PATH = "/home/speaker-details";

export type SpeakerDetailsPageParams = { id: string };

export const DEFAULT_SPEAKER_DETAILS: SpeakerDetailsPageParams = {
  id: "new",
};

export const defaultSpeakerDetailsString = new URLSearchParams(
  DEFAULT_SPEAKER_DETAILS
);

export const speakerDetailsPagePath = QUERY_PLACEHOLDER
  ? `${ SPEAKER_DETAILS_PAGE_PATH}/:${QUERY_PLACEHOLDER}`
  : SPEAKER_DETAILS_PAGE_PATH;

export const path = (param?: SpeakerDetailsPageParams) => {
  if (!QUERY_PLACEHOLDER) return SPEAKER_DETAILS_PAGE_PATH;
  if (!param)
    return `${ SPEAKER_DETAILS_PAGE_PATH}/${defaultSpeakerDetailsString.toString()}`;

  const params = new URLSearchParams(param);

  return SPEAKER_DETAILS_PAGE_PATH + "/" + params.toString();
};

export function useSpeakerDetailsPageParams(): SpeakerDetailsPageParams {
  const { speakerDetails } = useParams<{ speakerDetails: string }>();
  const params = Object.fromEntries(
    new URLSearchParams(speakerDetails).entries()
  ) as SpeakerDetailsPageParams;
  return params;
}

//generated using ionic-page/params.hbs