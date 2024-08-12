import { IonButton, IonCard, IonFabButton, IonItem } from "@ionic/react";
import { PATHS } from "../../util/paths";
import { ComponentProps } from "react";

function Button( props: ComponentProps<typeof IonButton>) {
  return (
    <IonButton routerLink={ PATHS.profile } {...props}>
      {props.children || "Profile"}
    </IonButton>
  );
}

function Item( props: ComponentProps<typeof IonItem>) {
  return (
    <IonItem routerLink={ PATHS.profile } {...props}>
      {props.children || "Profile"}
    </IonItem>
  );
}

function Card( props: ComponentProps<typeof IonCard>) {
  return (
    <IonCard routerLink={ PATHS.profile } {...props}>
      {props.children || "Profile"}
    </IonCard>
  );
}

function FabButton( props: ComponentProps<typeof IonFabButton>) {
  return (
    <IonFabButton routerLink={ PATHS.profile } {...props}>
      {props.children || "Profile"}
    </IonFabButton>
  );
}

export const ProfilePageLink = { Button, Item, Card, FabButton };

// generated