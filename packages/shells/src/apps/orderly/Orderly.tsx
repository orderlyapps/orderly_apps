import { ORDERLY_ROUTES } from "@repo/feature/ORDERLY_ROUTES";
import { IonTabsApp } from "@repo/ionic/IonTabsApp";
import { ReactQueryProvider } from "@repo/react-query/ReactQueryProvider";

export function Orderly() {
  return (
    <ReactQueryProvider>
      <IonTabsApp pages={ORDERLY_ROUTES}></IonTabsApp>
    </ReactQueryProvider>
  );
}
