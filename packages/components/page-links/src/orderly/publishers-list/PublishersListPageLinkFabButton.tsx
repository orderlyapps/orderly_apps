import { IonFabButton } from "@ionic/react";
import { path, Param } from "../../helper/path";
import { ComponentProps } from "react"
import { ORDERLY_PATHS } from "../ORDERLY_PATHS";

export function PublishersListPageLinkFabButton({
  param, 
  ...props
}: ComponentProps<typeof IonFabButton> & { param?: Param }) {
  return (
    <IonFabButton routerLink={path( ORDERLY_PATHS, "publishers_list", param)} {...props}>
      {props.children || "Publishers List"}
    </IonFabButton>
  );
}

// generated
