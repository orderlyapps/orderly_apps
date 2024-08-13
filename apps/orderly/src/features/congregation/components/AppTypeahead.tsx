import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonSearchbar,
  IonToolbar,
} from "@ionic/react";

export interface Item {
  name: string;
  id: string;
}

interface TypeaheadProps {
  items: Item[];
  title?: string;
  onCancel?: () => void;
  onSelection: (items: string) => void;
  value?: string
}

const MINIMUM_SEARCH_STRING_LENGTH = 3;

function AppTypeahead(props: TypeaheadProps) {
  const [filteredItems, setFilteredItems] = useState<Item[]>([...props.items]);
  const [selectedItem, setSelectedItem] = useState<string>(props.value || "");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchbarInput = (ev: any) => {
    setSearchQuery(ev.target.value);
    filterList(ev.target.value);
  };

  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  const filterList = (searchQuery: string | null | undefined) => {
    /**
     * If no search query is defined,
     * return all options.
     */
    if (searchQuery === undefined || searchQuery === null) {
      setFilteredItems([...props.items]);
    } else {
      /**
       * Otherwise, normalize the search
       * query and check to see which items
       * contain the search query as a substring.
       */
      const normalizedQuery = searchQuery.toLowerCase();
      setFilteredItems(
        props.items.filter((item) => {
          return item.name.toLowerCase().includes(normalizedQuery) || selectedItem === item.id;
        })
      );
    }
  };
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={props.onCancel}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              disabled={selectedItem === "" || (searchQuery === "" && selectedItem === "new")}
              onClick={() => props.onSelection(selectedItem)}
            >
              <strong>{selectedItem === "new" ? "Create" : "Select"}</strong>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar onIonInput={searchbarInput} onIonClear={() => console.log("clear")}></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light" class="ion-padding">
        {searchQuery.length >= MINIMUM_SEARCH_STRING_LENGTH && (
          <IonList inset>
            <IonItem>
              <IonCheckbox
                value={"new"}
                checked={selectedItem === "new"}
                onIonChange={() =>
                  setSelectedItem(selectedItem === "new" ? "" : "new")
                }
              >
                Create "{searchQuery}" congregation
              </IonCheckbox>
            </IonItem>
          </IonList>
        )}

        <IonList
          id="modal-
        </IonItem>list"
          inset={true}
        >
          {filteredItems.map((item) => (
            <IonItem key={item.id}>
              <IonCheckbox
                value={item.id}
                checked={selectedItem === item.id}
                onIonChange={() => {
                  setSelectedItem(selectedItem === item.id ? "" : item.id);
                }}
              >
                {item.name}
              </IonCheckbox>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
}
export default AppTypeahead;
