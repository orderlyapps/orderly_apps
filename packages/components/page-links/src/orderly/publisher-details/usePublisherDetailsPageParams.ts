import { useParams } from "react-router";

export const QUERY_PLACEHOLDER = "publisherDetails";

const PUBLISHER_DETAILS_PAGE_PATH = "/home/publisher-details";

export type PublisherDetailsPageParams = { id: string };

export const DEFAULT_PUBLISHER_DETAILS: PublisherDetailsPageParams = {
  id: "new",
};

export const defaultPublisherDetailsString = new URLSearchParams(
  DEFAULT_PUBLISHER_DETAILS
);

export const publisherDetailsPagePath = QUERY_PLACEHOLDER
  ? `${PUBLISHER_DETAILS_PAGE_PATH}/:${QUERY_PLACEHOLDER}`
  : PUBLISHER_DETAILS_PAGE_PATH;

export const path = (param?: PublisherDetailsPageParams) => {
  if (!QUERY_PLACEHOLDER) return PUBLISHER_DETAILS_PAGE_PATH;
  if (!param)
    return `${PUBLISHER_DETAILS_PAGE_PATH}/${defaultPublisherDetailsString.toString()}`;

  const params = new URLSearchParams(param);

  return PUBLISHER_DETAILS_PAGE_PATH + "/" + params.toString();
};

export function usePublisherDetailsPageParams(): PublisherDetailsPageParams {
  const { publisherDetails } = useParams<{ publisherDetails: string }>();
  const params = Object.fromEntries(
    new URLSearchParams(publisherDetails).entries()
  ) as PublisherDetailsPageParams;
  return params;
}
