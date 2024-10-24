import { IonCard } from "@ionic/react";
import { path, Param } from "../../helper/path";
import { ComponentProps } from "react"
import { ORDERLY_PATHS } from "../ORDERLY_PATHS";

export function PublisherDetailsPageLinkCard({
  param, 
  ...props
}: ComponentProps<typeof IonCard> & { param?: Param }) {
  return (
    <IonCard routerLink={path( ORDERLY_PATHS, "publisher_details", param)} {...props}>
      {props.children || "Publisher Details"}
    </IonCard>
  );
}

// generated
