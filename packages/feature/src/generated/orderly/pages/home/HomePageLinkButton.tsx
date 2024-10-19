import { IonButton } from "@ionic/react";
import { path, Param } from "./path";
import { ComponentProps } from "react"

export function HomePageLinkButton({
  param, 
  ...props
}: ComponentProps<typeof IonButton> & { param?: Param }) {
  return (
    <IonButton routerLink={path(param)} {...props}>
      {props.children || "Home"}
    </IonButton>
  );
}

// generated
