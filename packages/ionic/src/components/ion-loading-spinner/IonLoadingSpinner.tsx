import { IonSpinner } from "@ionic/react";
import { ComponentProps } from "react";

export function IonLoadingSpinner({
  name = "dots",
  ...rest
}: ComponentProps<typeof IonSpinner>) {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <IonSpinner name={name} {...rest}></IonSpinner>
    </div>
  );
}
