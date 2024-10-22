import { IonItem } from "@ionic/react";
import { path, Param } from "../../helper/path";
import { ComponentProps } from "react"
import { ORDERLY_PATHS } from "../ORDERLY_PATHS";

export function PublishersListPageLinkItem({
  param, 
  ...props
}: ComponentProps<typeof IonItem> & { param?: Param }) {
  return (
    <IonItem routerLink={path( ORDERLY_PATHS, "publishers_list", param)} {...props}>
      {props.children || "Publishers List"}
    </IonItem>
  );
}

// generated
