import { ORDERLY_ROUTES } from "@repo/feature/ORDERLY_ROUTES";
import { IonTabsApp } from "@repo/ionic/IonTabsApp";

console.log("ORDERLY_ROUTES:", ORDERLY_ROUTES);
export function Orderly() {
  return <IonTabsApp pages={ORDERLY_ROUTES}></IonTabsApp>;
}
