import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonModal,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronExpandOutline } from "ionicons/icons";
import { ReactNode, useEffect, useState } from "react";

export interface Item {
  name: string;
  searchString: string;
  id: string | null;
  data: any;
  component?: ReactNode;
}

export interface AutocompleteProps {
  items?: Item[];
  title?: string;
  onSelect: (
    e: { target: { value: Item | null; name: string | undefined } } | null
  ) => void;
  valueID?: string;
  name?: string;
  children: ReactNode;
  readonly?: boolean;
}

function AutocompleteModalItem({
  items,
  title,
  onSelect,
  valueID,
  name,
  children,
  readonly = false,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Item[] | undefined>(items);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const onSelection = async () => {
    onSelect({ target: { value: selectedItem, name } });
    setIsOpen(false);
  };
  const onCancelation = async () => {
    setIsOpen(false);
    onSelect(null);
  };

  const searchbarInput = (ev: any) => {
    setSearchQuery(ev.target.value);
    filterList(ev.target.value);
  };

  const filterList = (searchQuery: string | null | undefined) => {
    if (searchQuery === undefined || searchQuery === null) {
      setFilteredItems([...(items || [])]);
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      setFilteredItems(
        items?.filter((item) => {
          return (
            item.searchString.toLowerCase().includes(normalizedQuery) ||
            selectedItem?.id === item.id
          );
        })
      );
    }
  };

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  return (
    <>
      <IonItem
        button={!readonly}
        detail={!readonly}
        detailIcon={chevronExpandOutline}
        onClick={() => setIsOpen(!readonly)}
      >
        {children}
      </IonItem>

      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={onCancelation}>Cancel</IonButton>
            </IonButtons>

            <IonTitle>{title}</IonTitle>

            <IonButtons slot="end">
              <IonButton onClick={onSelection}>
                <strong>Select</strong>
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar
              placeholder={`Placeholder`}
              onIonInput={searchbarInput}
            ></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {filteredItems?.map((item) => {
            return (
              <IonItem key={item.id}>
                <IonCheckbox
                  value={item.id}
                  checked={selectedItem?.id === item.id}
                  onIonChange={() => {
                    setSelectedItem(item);
                  }}
                >
                  {item.component || item.name}
                </IonCheckbox>
              </IonItem>
            );
          })}
        </IonContent>
      </IonModal>
    </>
  );
}

export default AutocompleteModalItem;
