import { IonButton, IonCard, IonFabButton, IonItem } from "@ionic/react";
import { PATHS } from "../../util/paths";
import { ComponentProps } from "react";
import { useStore } from "../../../../data/zustand/useStore";

const useID = () => {
  const {
    user: { id },
  }: any = useStore.use.session();
  return id;
};

function Button(props: ComponentProps<typeof IonButton>) {
  const id = useID();
  return (
    <IonButton routerLink={PATHS.profile + "/" + id} {...props}>
      {props.children || "Profile"}
    </IonButton>
  );
}

function Item(props: ComponentProps<typeof IonItem>) {
  const id = useID();
  return (
    <IonItem routerLink={PATHS.profile + "/" + id} {...props}>
      {props.children || "Profile"}
    </IonItem>
  );
}

function Card(props: ComponentProps<typeof IonCard>) {
  const id = useID();
  return (
    <IonCard routerLink={PATHS.profile + "/" + id} {...props}>
      {props.children || "Profile"}
    </IonCard>
  );
}

function FabButton(props: ComponentProps<typeof IonFabButton>) {
  const id = useID();
  return (
    <IonFabButton routerLink={PATHS.profile + "/" + id} {...props}>
      {props.children || "Profile"}
    </IonFabButton>
  );
}

export const ProfilePageLink = { Button, Item, Card, FabButton };

// generated
