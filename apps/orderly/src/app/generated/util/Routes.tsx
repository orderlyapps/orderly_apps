import { IonSpinner } from "@ionic/react";
import { Route, Redirect } from "react-router";
import HomePage from "../pages/home/HomePage";
import { PATHS } from "./paths";
import { lazy, Suspense } from "react";
const CongregationDetailsPage = lazy(
  () => import("../../../features/congregation/pages/CongregationDetailsPage")
);
const CreateCongregationPage = lazy(
  () => import("../../../features/congregation/pages/CreateCongregationPage")
);
const TestingPage = lazy(() => import("../pages/home/TestingPage"));
const OutlinesListPage = lazy(
  () => import("../../../features/public-talks/pages/OutlinesListPage")
);
const PublishersListPage = lazy(
  () => import("../../../features/people/pages/ProfilePage")
);
const ProfilePage = lazy(
  () => import("../../../features/people/pages/ProfilePage")
);
const SettingsPage = lazy(
  () => import("../../../features/settings/pages/SettingsPage")
);
export function Routes({}) {
  return (
    <>
      <Route exact path="/home">
        <HomePage />
      </Route>

      <Route exact path="/settings">
        <Suspense fallback={<IonSpinner />}>
          <SettingsPage />
        </Suspense>
      </Route>

      <Route exact path="/">
        <Redirect to="/home" />
      </Route>

      <Route exact path={PATHS.outlines_list}>
        <Suspense fallback={<IonSpinner />}>
          <OutlinesListPage />
        </Suspense>
      </Route>

      <Route exact path={PATHS.profile}>
        <Suspense fallback={<IonSpinner />}>
          <ProfilePage />
        </Suspense>
      </Route>

      <Route exact path={PATHS.publishers_list}>
        <Suspense fallback={<IonSpinner />}>
          <PublishersListPage />
        </Suspense>
      </Route>

      <Route exact path={PATHS.testing}>
        <Suspense fallback={<IonSpinner />}>
          <TestingPage />
        </Suspense>
      </Route>

      <Route exact path={PATHS.create_congregation}>
        <Suspense fallback={<IonSpinner />}>
          <CreateCongregationPage />
        </Suspense>
      </Route>

      <Route exact path={"/settings/congregation-details/:congregation_id"}>
        <Suspense fallback={<IonSpinner />}>
          <CongregationDetailsPage />
        </Suspense>
      </Route>
    </>
  );
}
