import { IonFabButton } from "@ionic/react";
import { path, Param } from "../../helper/path";
import { ComponentProps } from "react"
import { ORDERLY_PATHS } from "../ORDERLY_PATHS";

export function OutlinesListPageLinkFabButton({
  param, 
  ...props
}: ComponentProps<typeof IonFabButton> & { param?: Param }) {
  return (
    <IonFabButton routerLink={path( ORDERLY_PATHS, "outlines_list", param)} {...props}>
      {props.children || "Outlines List"}
    </IonFabButton>
  );
}

// generated
