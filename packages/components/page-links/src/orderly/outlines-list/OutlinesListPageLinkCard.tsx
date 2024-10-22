import { IonCard } from "@ionic/react";
import { path, Param } from "../../helper/path";
import { ComponentProps } from "react"
import { ORDERLY_PATHS } from "../ORDERLY_PATHS";

export function OutlinesListPageLinkCard({
  param, 
  ...props
}: ComponentProps<typeof IonCard> & { param?: Param }) {
  return (
    <IonCard routerLink={path( ORDERLY_PATHS, "outlines_list", param)} {...props}>
      {props.children || "Outlines List"}
    </IonCard>
  );
}

// generated
