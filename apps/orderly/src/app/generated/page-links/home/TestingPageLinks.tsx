import { IonButton, IonCard, IonFabButton, IonItem } from "@ionic/react";
import { PATHS } from "../../util/paths";
import { ComponentProps } from "react";

function Button( props: ComponentProps<typeof IonButton>) {
  return (
    <IonButton routerLink={ PATHS.testing } {...props}>
      {props.children || "Testing"}
    </IonButton>
  );
}

function Item( props: ComponentProps<typeof IonItem>) {
  return (
    <IonItem routerLink={ PATHS.testing } {...props}>
      {props.children || "Testing"}
    </IonItem>
  );
}

function Card( props: ComponentProps<typeof IonCard>) {
  return (
    <IonCard routerLink={ PATHS.testing } {...props}>
      {props.children || "Testing"}
    </IonCard>
  );
}

function FabButton( props: ComponentProps<typeof IonFabButton>) {
  return (
    <IonFabButton routerLink={ PATHS.testing } {...props}>
      {props.children || "Testing"}
    </IonFabButton>
  );
}

export const TestingPageLink = { Button, Item, Card, FabButton };

// generated