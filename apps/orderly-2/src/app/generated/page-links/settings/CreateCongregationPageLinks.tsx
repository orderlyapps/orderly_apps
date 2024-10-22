import { IonButton, IonCard, IonFabButton, IonItem } from "@ionic/react";
import { PATHS } from "../../util/paths";
import { ComponentProps } from "react";

function Button( props: ComponentProps<typeof IonButton>) {
  return (
    <IonButton routerLink={ PATHS.create_congregation } {...props}>
      {props.children || "Create Congregation"}
    </IonButton>
  );
}

function Item( props: ComponentProps<typeof IonItem>) {
  return (
    <IonItem routerLink={ PATHS.create_congregation } {...props}>
      {props.children || "Create Congregation"}
    </IonItem>
  );
}

function Card( props: ComponentProps<typeof IonCard>) {
  return (
    <IonCard routerLink={ PATHS.create_congregation } {...props}>
      {props.children || "Create Congregation"}
    </IonCard>
  );
}

function FabButton( props: ComponentProps<typeof IonFabButton>) {
  return (
    <IonFabButton routerLink={ PATHS.create_congregation } {...props}>
      {props.children || "Create Congregation"}
    </IonFabButton>
  );
}

export const CreateCongregationPageLink = { Button, Item, Card, FabButton };

// generated