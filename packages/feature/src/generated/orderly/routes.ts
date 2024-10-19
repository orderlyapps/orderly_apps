import { IonTabsAppPage } from "@repo/ionic/IonTabsApp";
import { PATHS } from "./paths";
import { lazy } from "react";
import { homeOutline, settingsOutline } from "ionicons/icons";

export const ORDERLY_ROUTES: IonTabsAppPage[] = [
  {
    path: PATHS.delete + "/:id",
    Component: lazy(() => import("./pages/delete/DeletePage")),
  },
  {
    path: PATHS.home,
    tab: "Home",
    icon: homeOutline,
    Component: lazy(() => import("./pages/home/HomePage")),
    redirect: true,
  },
  {
    path: PATHS.settings,
    tab: "Settings",
    icon: settingsOutline,
    Component: lazy(() => import("./pages/settings/SettingsPage")),
    // redirect: true
  },
];
