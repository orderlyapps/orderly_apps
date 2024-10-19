import { IonItem } from "@ionic/react";
import { path, Param } from "./path";
import { ComponentProps } from "react"

export function DeletePageLinkItem({
  param, 
  ...props
}: ComponentProps<typeof IonItem> & { param?: Param }) {
  return (
    <IonItem routerLink={path(param)} {...props}>
      {props.children || "Delete"}
    </IonItem>
  );
}

// generated
