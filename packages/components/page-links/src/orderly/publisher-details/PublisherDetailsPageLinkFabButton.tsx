import { IonFabButton } from "@ionic/react";
import { path, Param } from "../../helper/path";
import { ComponentProps } from "react"
import { ORDERLY_PATHS } from "../ORDERLY_PATHS";

export function PublisherDetailsPageLinkFabButton({
  param, 
  ...props
}: ComponentProps<typeof IonFabButton> & { param?: Param }) {
  return (
    <IonFabButton routerLink={path( ORDERLY_PATHS, "publisher_details", param)} {...props}>
      {props.children || "Publisher Details"}
    </IonFabButton>
  );
}

// generated