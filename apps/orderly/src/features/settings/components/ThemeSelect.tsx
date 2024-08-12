import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { useStore } from "../../../data/zustand/useStore";

export function ThemeSelect() {
  const theme = useStore.use.theme();
  const setStoreProperties = useStore.use.setStoreProperties();

  const handleThemeChange = (ev: any) => {
    document.documentElement.classList.toggle(
      "ion-palette-dark",
      ev.target.value === "dark"
    );

    setStoreProperties("theme", ev.target.value);
  };

  return (
    <IonItem>
      <IonLabel>
        <strong>Theme:</strong>
      </IonLabel>
      <IonSelect
        aria-label="Theme"
        interface="popover"
        placeholder="Select theme"
        slot="end"
        value={theme}
        onIonChange={handleThemeChange}
      >
        <IonSelectOption value="dark">Dark</IonSelectOption>
        <IonSelectOption value="light">Light</IonSelectOption>
        {/* <IonSelectOption value="auto">Auto</IonSelectOption> */}
      </IonSelect>
    </IonItem>
  );
}
