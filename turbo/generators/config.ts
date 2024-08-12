import { PlopTypes } from "@turbo/gen";
import { ionicPage } from "./ionic-page/config";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  ionicPage(plop);
}
