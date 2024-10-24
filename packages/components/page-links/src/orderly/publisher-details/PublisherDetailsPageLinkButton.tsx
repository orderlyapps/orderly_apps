import { IonButton } from "@ionic/react";
import { path, Param } from "../../helper/path";
import { ComponentProps } from "react"
import { ORDERLY_PATHS } from "../ORDERLY_PATHS";

export function PublisherDetailsPageLinkButton({
  param, 
  ...props
}: ComponentProps<typeof IonButton> & { param?: Param }) {
  return (
    <IonButton routerLink={path( ORDERLY_PATHS, "publisher_details", param)} {...props}>
      {props.children || "Publisher Details"}
    </IonButton>
  );
}

// generated
