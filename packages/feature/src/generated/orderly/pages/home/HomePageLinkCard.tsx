import { IonCard } from "@ionic/react";
import { path, Param } from "./path";
import { ComponentProps } from "react"

export function HomePageLinkCard({
  param, 
  ...props
}: ComponentProps<typeof IonCard> & { param?: Param }) {
  return (
    <IonCard routerLink={path(param)} {...props}>
      {props.children || "Home"}
    </IonCard>
  );
}

// generated
