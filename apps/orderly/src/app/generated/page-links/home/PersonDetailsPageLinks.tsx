import { IonButton, IonCard, IonFabButton, IonItem } from "@ionic/react";
import { PATHS } from "../../util/paths";
import { ComponentProps } from "react"

type Param = string | undefined | null;

const path = (param?: Param) => {
  if (param) return `${ PATHS.person_details }/${param}`;
  return PATHS.person_details;
};

function Button({
  param, 
  ...props
}: ComponentProps<typeof IonButton> & { param?: Param }) {
  return (
    <IonButton routerLink={path(param)} {...props}>
      {props.children || "Person Details"}
    </IonButton>
  );
}

function Item({
  param, 
  ...props
}: ComponentProps<typeof IonItem> & { param?: Param }) {
  return (
    <IonItem routerLink={path(param)} {...props}>
      {props.children || "Person Details"}
    </IonItem>
  );
}

function Card({
  param, 
  ...props
}: ComponentProps<typeof IonCard> & { param?: Param }) {
  return (
    <IonCard routerLink={path(param)} {...props}>
      {props.children || "Person Details"}
    </IonCard>
  );
}

function FabButton({
  param, 
  ...props
}: ComponentProps<typeof IonFabButton> & { param?: Param }) {
  return (
    <IonFabButton routerLink={path(param)} {...props}>
      {props.children || "Person Details"}
    </IonFabButton>
  );
}

export const PersonDetailsPageLink = { Button, Item, Card, FabButton };

// generated