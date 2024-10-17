import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import { homeOutline, settingsOutline } from "ionicons/icons";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./ionicInit.js";

export const IonTabsApp = ({
  pages = defaultPages,
}: {
  pages?: IonTabsAppPage[];
}) => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {pages.map(({ Component, path }: any, index: number) => (
              <Route exact path={path} key={index}>
                <Component />
              </Route>
            ))}
            <Route exact path="/">
              <Redirect
                to={pages.find(({ redirect }) => redirect)?.path || "/home"}
              />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            {pages
              .filter(({ tab }: any) => !!tab)
              .map(({ tab, path, icon }: any, index: number) => (
                <IonTabButton tab={tab} key={index} href={path}>
                  <IonIcon aria-hidden="true" icon={icon} />
                  <IonLabel>{tab}</IonLabel>
                </IonTabButton>
              ))}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

const defaultPages = [
  {
    path: "/home",
    tab: "Home",
    icon: homeOutline,
    Component: () => (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>Home</IonContent>
      </IonPage>
    ),
    redirect: true,
  },
  {
    path: "/settings",
    tab: "Settings",
    icon: settingsOutline,
    Component: () => (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>Settings</IonContent>
      </IonPage>
    ),
  },
];

type IonTabsAppPage = {
  path: string;
  tab?: string;
  icon: string;
  Component: () => JSX.Element;
  redirect?: boolean;
};
