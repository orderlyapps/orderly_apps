import { useState } from "react";
import {
  IonCheckbox, IonItem, IonList,
  IonSearchbar
} from "@ionic/react";
import { OUTLINES } from "../helpers/outlines";

function OutlineSelect() {
  let [results, setResults] = useState([...OUTLINES]);

  const handleInput = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(
      OUTLINES.filter(
        ({ number, title }) =>
          (number + title).toLowerCase().indexOf(query) > -1
      )
    );
  };

  return (
    <>
      <IonSearchbar
        debounce={200}
        onIonInput={(ev) => handleInput(ev)}
      ></IonSearchbar>

      <IonList>
        {results.map((outline) => (
          <IonItem key={outline.number}>
            <IonCheckbox justify="space-between">
              <strong>{outline.number} - </strong>
              {outline.title}
            </IonCheckbox>
          </IonItem>
        ))}
      </IonList>
    </>
  );
}
export default OutlineSelect;
