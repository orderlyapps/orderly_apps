import { IonCard } from "@ionic/react";
import { path, Param } from "./path";
import { ComponentProps } from "react"

export function SettingsPageLinkCard({
  param, 
  ...props
}: ComponentProps<typeof IonCard> & { param?: Param }) {
  return (
    <IonCard routerLink={path(param)} {...props}>
      {props.children || "Settings"}
    </IonCard>
  );
}

// generated
