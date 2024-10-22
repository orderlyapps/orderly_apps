import { IonButton, IonCard, IonFabButton, IonItem } from "@ionic/react";
import { PATHS } from "../../util/paths";
import { ComponentProps } from "react";

function Button(props: ComponentProps<typeof IonButton>) {
  return (
    <IonButton routerLink={PATHS.publishers_list} {...props}>
      {props.children || "Publishers List"}
    </IonButton>
  );
}

function Item(props: ComponentProps<typeof IonItem>) {
  return (
    <IonItem routerLink={PATHS.publishers_list} {...props}>
      {props.children || "Publishers List"}
    </IonItem>
  );
}

function Card(props: ComponentProps<typeof IonCard>) {
  return (
    <IonCard routerLink={PATHS.publishers_list} {...props}>
      {props.children || "Publishers List"}
    </IonCard>
  );
}

function FabButton(props: ComponentProps<typeof IonFabButton>) {
  return (
    <IonFabButton routerLink={PATHS.publishers_list} {...props}>
      {props.children || "Publishers List"}
    </IonFabButton>
  );
}

export const PublishersListPageLink = { Button, Item, Card, FabButton };

// generated
