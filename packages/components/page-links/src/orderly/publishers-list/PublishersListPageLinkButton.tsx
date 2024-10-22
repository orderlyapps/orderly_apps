import { IonButton } from "@ionic/react";
import { path, Param } from "../../helper/path";
import { ComponentProps } from "react"
import { ORDERLY_PATHS } from "../ORDERLY_PATHS";

export function PublishersListPageLinkButton({
  param, 
  ...props
}: ComponentProps<typeof IonButton> & { param?: Param }) {
  return (
    <IonButton routerLink={path( ORDERLY_PATHS, "publishers_list", param)} {...props}>
      {props.children || "Publishers List"}
    </IonButton>
  );
}

// generated
