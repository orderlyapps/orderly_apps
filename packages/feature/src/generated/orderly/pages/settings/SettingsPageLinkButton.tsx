import { IonButton } from "@ionic/react";
import { path, Param } from "./path";
import { ComponentProps } from "react"

export function SettingsPageLinkButton({
  param, 
  ...props
}: ComponentProps<typeof IonButton> & { param?: Param }) {
  return (
    <IonButton routerLink={path(param)} {...props}>
      {props.children || "Settings"}
    </IonButton>
  );
}

// generated
