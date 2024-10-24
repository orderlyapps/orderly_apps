import { IonItem } from "@ionic/react";
import { ComponentProps } from "react";
import {
  path,
  SpeakerDetailsPageParams,
} from "./useSpeakerDetailsPageParams";

export function SpeakerDetailsPageLinkItem({
  param,
  ...props
}: ComponentProps<typeof IonItem> & { param?: SpeakerDetailsPageParams }) {
  return (
    <IonItem routerLink={path(param)} {...props}>
      {props.children || "Speaker Details"}
    </IonItem>
  );
}

//generated using ionic-page/link.hbs
