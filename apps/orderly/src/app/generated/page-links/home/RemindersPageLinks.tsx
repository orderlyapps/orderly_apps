import { IonButton, IonCard, IonFabButton, IonItem } from "@ionic/react";
import { PATHS } from "../../util/paths";
import { ComponentProps } from "react"

type Param = string | undefined | null;

const path = (param?: Param) => {
  if (param) return `${ PATHS.reminders }/${param}`;
  return PATHS.reminders;
};

function Button({
  param, 
  ...props
}: ComponentProps<typeof IonButton> & { param?: Param }) {
  return (
    <IonButton routerLink={path(param)} {...props}>
      {props.children || "Reminders"}
    </IonButton>
  );
}

function Item({
  param, 
  ...props
}: ComponentProps<typeof IonItem> & { param?: Param }) {
  return (
    <IonItem routerLink={path(param)} {...props}>
      {props.children || "Reminders"}
    </IonItem>
  );
}

function Card({
  param, 
  ...props
}: ComponentProps<typeof IonCard> & { param?: Param }) {
  return (
    <IonCard routerLink={path(param)} {...props}>
      {props.children || "Reminders"}
    </IonCard>
  );
}

function FabButton({
  param, 
  ...props
}: ComponentProps<typeof IonFabButton> & { param?: Param }) {
  return (
    <IonFabButton routerLink={path(param)} {...props}>
      {props.children || "Reminders"}
    </IonFabButton>
  );
}

export const RemindersPageLink = { Button, Item, Card, FabButton };

// generated