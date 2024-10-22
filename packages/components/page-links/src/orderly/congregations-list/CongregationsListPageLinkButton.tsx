import { IonButton } from "@ionic/react";
import { path, Param } from "../../helper/path";
import { ComponentProps } from "react"
import { ORDERLY_PATHS } from "../ORDERLY_PATHS";

export function CongregationsListPageLinkButton({
  param, 
  ...props
}: ComponentProps<typeof IonButton> & { param?: Param }) {
  return (
    <IonButton routerLink={path( ORDERLY_PATHS, "congregations_list", param)} {...props}>
      {props.children || "Congregations List"}
    </IonButton>
  );
}

// generated
