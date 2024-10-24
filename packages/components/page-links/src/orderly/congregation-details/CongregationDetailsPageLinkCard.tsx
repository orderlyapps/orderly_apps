import { IonItem } from "@ionic/react";
import { ComponentProps } from "react";
import {
  path,
  CongregationDetailsPageParams,
} from "./useCongregationDetailsPageParams";

export function CongregationDetailsPageLinkItem({
  param,
  ...props
}: ComponentProps<typeof IonItem> & { param?: CongregationDetailsPageParams }) {
  return (
    <IonItem routerLink={path(param)} {...props}>
      {props.children || "Congregation Details"}
    </IonItem>
  );
}

//generated using ionic-page/link.hbs
