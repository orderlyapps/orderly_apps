import { IonButton, IonCard, IonFabButton, IonItem } from "@ionic/react";
import { PATHS } from "../../util/paths";
import { ComponentProps } from "react";

function Button( props: ComponentProps<typeof IonButton>) {
  return (
    <IonButton routerLink={ PATHS.settings } {...props}>
      {props.children || "Profile"}
    </IonButton>
  );
}

function Item( props: ComponentProps<typeof IonItem>) {
  return (
    <IonItem routerLink={ PATHS.settings } {...props}>
      {props.children || "Profile"}
    </IonItem>
  );
}

function Card( props: ComponentProps<typeof IonCard>) {
  return (
    <IonCard routerLink={ PATHS.settings } {...props}>
      {props.children || "Profile"}
    </IonCard>
  );
}

function FabButton( props: ComponentProps<typeof IonFabButton>) {
  return (
    <IonFabButton routerLink={ PATHS.settings } {...props}>
      {props.children || "Profile"}
    </IonFabButton>
  );
}

export const SettingsPageLink = { Button, Item, Card, FabButton };

// generated