import { IonButton, IonCard, IonFabButton, IonItem } from "@ionic/react";
import { PATHS } from "../../util/paths";
import { ComponentProps } from "react";

type Param = string | undefined | null;

const path = (param?: Param) => {
  if (param) return `${PATHS.congregation_details}/${param}`;
  return PATHS.congregation_details;
};

function Button({
  param,
  ...props
}: ComponentProps<typeof IonButton> & { param: Param }) {
  return (
    <IonButton routerLink={path(param)} {...props}>
      {props.children || "Congregation Details"}
    </IonButton>
  );
}

function Item({
  param,
  ...props
}: ComponentProps<typeof IonItem> & { param?: Param }) {
  return (
    <IonItem button detail routerLink={param as string} {...props}>
      {props.children || "Congregation Details"}
    </IonItem>
  );
}

function Card({
  param,
  ...props
}: ComponentProps<typeof IonCard> & { param?: string }) {
  return (
    <IonCard routerLink={path(param)} {...props}>
      {props.children || "Congregation Details"}
    </IonCard>
  );
}

function FabButton({
  param,
  ...props
}: ComponentProps<typeof IonFabButton> & { param?: string }) {
  return (
    <IonFabButton routerLink={path(param)} {...props}>
      {props.children || "Congregation Details"}
    </IonFabButton>
  );
}

export const CongregationDetailsPageLink = { Button, Item, Card, FabButton };

// generated
