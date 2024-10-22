import { IonTabsAppPage } from "@repo/ionic/IonTabsApp";
import { lazy } from "react";
import { homeOutline, settingsOutline } from "ionicons/icons";
import { ORDERLY_PATHS } from "@repo/page-links/ORDERLY_PATHS";

export const ORDERLY_ROUTES: IonTabsAppPage[] = [
  {
    path: ORDERLY_PATHS.speakers_list,
    // tab: 'string',
    // icon: homeOutline,
    Component: lazy(
      () => import('./pages/speakers-list/SpeakersListPage')
    ),
    // redirect: true
  },
  {
    path: ORDERLY_PATHS.publishers_list,
    // tab: 'string',
    // icon: homeOutline,
    Component: lazy(
      () => import('./pages/publishers-list/PublishersListPage')
    ),
    // redirect: true
  },
  {
    path: ORDERLY_PATHS.congregations_list,
    // tab: 'string',
    // icon: homeOutline,
    Component: lazy(
      () => import('./pages/congregations-list/CongregationsListPage')
    ),
    // redirect: true
  },
  {
    path: ORDERLY_PATHS.outlines_list,
    // tab: 'string',
    // icon: homeOutline,
    Component: lazy(
      () => import('./pages/outlines-list/OutlinesListPage')
    ),
    // redirect: true
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
    // redirect: true
  },
];
