import { IonCard } from "@ionic/react";
import { path, Param } from "../../helper/path";
import { ComponentProps } from "react"
import { ORDERLY_PATHS } from "../ORDERLY_PATHS";

export function CongregationsListPageLinkCard({
  param, 
  ...props
}: ComponentProps<typeof IonCard> & { param?: Param }) {
  return (
    <IonCard routerLink={path( ORDERLY_PATHS, "congregations_list", param)} {...props}>
      {props.children || "Congregations List"}
    </IonCard>
  );
}

// generated
