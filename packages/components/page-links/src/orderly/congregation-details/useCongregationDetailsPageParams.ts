import { useParams } from "react-router";

export const QUERY_PLACEHOLDER = "congregationDetails";

const CONGREGATION_DETAILS_PAGE_PATH = "/home/congregation-details";

export type CongregationDetailsPageParams = { id: string };

export const DEFAULT_CONGREGATION_DETAILS: CongregationDetailsPageParams = {
  id: "new",
};

export const defaultCongregationDetailsString = new URLSearchParams(
  DEFAULT_CONGREGATION_DETAILS
);

export const congregationDetailsPagePath = QUERY_PLACEHOLDER
  ? `${ CONGREGATION_DETAILS_PAGE_PATH}/:${QUERY_PLACEHOLDER}`
  : CONGREGATION_DETAILS_PAGE_PATH;

export const path = (param?: CongregationDetailsPageParams) => {
  if (!QUERY_PLACEHOLDER) return CONGREGATION_DETAILS_PAGE_PATH;
  if (!param)
    return `${ CONGREGATION_DETAILS_PAGE_PATH}/${defaultCongregationDetailsString.toString()}`;

  const params = new URLSearchParams(param);

  return CONGREGATION_DETAILS_PAGE_PATH + "/" + params.toString();
};

export function useCongregationDetailsPageParams(): CongregationDetailsPageParams {
  const { congregationDetails } = useParams<{ congregationDetails: string }>();
  const params = Object.fromEntries(
    new URLSearchParams(congregationDetails).entries()
  ) as CongregationDetailsPageParams;
  return params;
}

//generated using ionic-page/params.hbs