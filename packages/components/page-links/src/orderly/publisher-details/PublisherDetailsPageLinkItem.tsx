import { IonItem } from "@ionic/react";
import { ComponentProps } from "react";
import {
  path,
  PublisherDetailsPageParams,
} from "./usePublisherDetailsPageParams";

export function PublisherDetailsPageLinkItem({
  param,
  ...props
}: ComponentProps<typeof IonItem> & { param?: PublisherDetailsPageParams }) {
  return (
    <IonItem routerLink={path(param)} {...props}>
      {props.children || "Publisher Details"}
    </IonItem>
  );
}

// generated
