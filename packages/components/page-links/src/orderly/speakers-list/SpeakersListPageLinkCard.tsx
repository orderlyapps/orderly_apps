import { IonCard } from "@ionic/react";
import { path, Param } from "../../helper/path";
import { ComponentProps } from "react"
import { ORDERLY_PATHS } from "../ORDERLY_PATHS";

export function SpeakersListPageLinkCard({
  param, 
  ...props
}: ComponentProps<typeof IonCard> & { param?: Param }) {
  return (
    <IonCard routerLink={path( ORDERLY_PATHS, "speakers_list", param)} {...props}>
      {props.children || "Speakers List"}
    </IonCard>
  );
}

// generated
