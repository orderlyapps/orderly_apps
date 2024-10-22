import React, { useState } from "react";
import { IonItem, IonLabel, IonList, IonSearchbar } from "@ionic/react";
import { OUTLINES } from "../helpers/outlines";

function OutlineSearch() {
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
          <IonItem key={outline.number} className="outline">
            <IonLabel class="ion-text-nowrap">
              <strong className="outline-number">{outline.number} - </strong>
              {outline.title}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </>
  );
}
export default OutlineSearch;
