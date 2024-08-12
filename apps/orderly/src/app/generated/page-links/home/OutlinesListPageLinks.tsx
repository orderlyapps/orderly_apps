import { IonButton, IonCard, IonFabButton, IonItem } from "@ionic/react";
import { PATHS } from "../../util/paths";
import { ComponentProps } from "react";

function Button( props: ComponentProps<typeof IonButton>) {
  return (
    <IonButton routerLink={ PATHS.outlines_list } {...props}>
      {props.children || "Outlines List"}
    </IonButton>
  );
}

function Item( props: ComponentProps<typeof IonItem>) {
  return (
    <IonItem routerLink={ PATHS.outlines_list } {...props}>
      {props.children || "Outlines List"}
    </IonItem>
  );
}

function Card( props: ComponentProps<typeof IonCard>) {
  return (
    <IonCard routerLink={ PATHS.outlines_list } {...props}>
      {props.children || "Outlines List"}
    </IonCard>
  );
}

function FabButton( props: ComponentProps<typeof IonFabButton>) {
  return (
    <IonFabButton routerLink={ PATHS.outlines_list } {...props}>
      {props.children || "Outlines List"}
    </IonFabButton>
  );
}

export const OutlinesListPageLink = { Button, Item, Card, FabButton };

// generated