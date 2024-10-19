import { IonFabButton } from "@ionic/react";
import { path, Param } from "./path";
import { ComponentProps } from "react"

export function DeletePageLinkFabButton({
  param, 
  ...props
}: ComponentProps<typeof IonFabButton> & { param?: Param }) {
  return (
    <IonFabButton routerLink={path(param)} {...props}>
      {props.children || "Delete"}
    </IonFabButton>
  );
}

// generated
