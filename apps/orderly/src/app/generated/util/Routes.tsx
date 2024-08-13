import { Route, Redirect } from "react-router";
import HomePage from "../pages/home/HomePage";
import { PATHS } from "./paths";
import { LoadingSpinner } from "../../../ui/LoadingSpinner";
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
        <Suspense fallback={<LoadingSpinner />}>
          <SettingsPage />
        </Suspense>
      </Route>

      <Route exact path="/">
        <Redirect to="/home" />
      </Route>

      <Route exact path={PATHS.outlines_list}>
        <Suspense fallback={<LoadingSpinner />}>
          <OutlinesListPage />
        </Suspense>
      </Route>

      <Route exact path={PATHS.profile}>
        <Suspense fallback={<LoadingSpinner />}>
          <ProfilePage />
        </Suspense>
      </Route>

      <Route exact path={PATHS.publishers_list}>
        <Suspense fallback={<LoadingSpinner />}>
          <PublishersListPage />
        </Suspense>
      </Route>

      <Route exact path={PATHS.testing}>
        <Suspense fallback={<LoadingSpinner />}>
          <TestingPage />
        </Suspense>
      </Route>

      <Route exact path={PATHS.create_congregation}>
        <Suspense fallback={<LoadingSpinner />}>
          <CreateCongregationPage />
        </Suspense>
      </Route>

      <Route exact path={"/settings/congregation-details/:congregation_id"}>
        <Suspense fallback={<LoadingSpinner />}>
          <CongregationDetailsPage />
        </Suspense>
      </Route>
    </>
  );
}