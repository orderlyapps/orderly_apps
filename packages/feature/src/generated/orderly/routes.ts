import { IonTabsAppPage } from "@repo/ionic/IonTabsApp";
import { lazy } from "react";
import { homeOutline, settingsOutline } from "ionicons/icons";
import { ORDERLY_PATHS } from "@repo/page-links/ORDERLY_PATHS";

export const ORDERLY_ROUTES: IonTabsAppPage[] = [
  {
    path: ORDERLY_PATHS.speaker_details,
    Component: lazy(
      () => import('./pages/speaker-details/SpeakerDetailsPage')
    ),
  },
  {
    path: ORDERLY_PATHS.congregation_details,
    Component: lazy(
      () => import('./pages/congregation-details/CongregationDetailsPage')
    ),
  },
  {
    path: ORDERLY_PATHS.publisher_details,
    Component: lazy(
      () => import("./pages/publisher-details/PublisherDetailsPage")
    ),
  },
  {
    path: ORDERLY_PATHS.speakers_list,
    Component: lazy(() => import("./pages/speakers-list/SpeakersListPage")),
  },
  {
    path: ORDERLY_PATHS.publishers_list,
    Component: lazy(() => import("./pages/publishers-list/PublishersListPage")),
  },
  {
    path: ORDERLY_PATHS.congregations_list,
    Component: lazy(
      () => import("./pages/congregations-list/CongregationsListPage")
    ),
  },
  {
    path: ORDERLY_PATHS.outlines_list,
    Component: lazy(() => import("./pages/outlines-list/OutlinesListPage")),
  },
  {
    path: ORDERLY_PATHS.home,
    tab: "Home",
    icon: homeOutline,
    Component: lazy(() => import("./pages/home/HomePage")),
    redirect: true,
  },
  {
    path: ORDERLY_PATHS.settings,
    tab: "Settings",
    icon: settingsOutline,
    Component: lazy(() => import("./pages/settings/SettingsPage")),
  },
];
