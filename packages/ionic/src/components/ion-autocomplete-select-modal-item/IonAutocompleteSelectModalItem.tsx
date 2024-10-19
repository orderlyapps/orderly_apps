import {
  CheckboxCustomEvent,
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
import { dummyData } from "./dummyData";

export interface IonAutocompleteSelectModalItemOption {
  name: string;
  searchString?: string;
  id: string;
  data?: any;
  component?: ReactNode;
}

export interface IonAutocompleteProps {
  items?: IonAutocompleteSelectModalItemOption[];
  title?: string;
  onSelect: (values: IonAutocompleteSelectModalItemOption[] | null) => void;
  children: ReactNode;
  readonly?: boolean;
  searchBarPlaceholder?: string;
  multiSelect?: boolean;
}

function IonAutocompleteSelectModalItem({
  items = dummyData,
  title,
  onSelect,
  children,
  readonly = false,
  searchBarPlaceholder = "Search",
  multiSelect = false,
}: IonAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] =
    useState<IonAutocompleteSelectModalItemOption[]>(items);

  const [selectedItems, setSelectedItems] = useState<
    IonAutocompleteSelectModalItemOption[] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isChecked = (id: string) => {
    return selectedItems?.find((item) => item.id === id) !== undefined;
  };

  const onCheckboxChange = (ev: CheckboxCustomEvent) => {
    const { checked, value } = ev.detail;

    if (!multiSelect) {
      setSelectedItems([value]);
      return;
    }

    if (checked) {
      setSelectedItems([...(selectedItems || []), value]);
    } else {
      setSelectedItems(
        (selectedItems || []).filter((item) => item.id !== value.id)
      );
    }
  };

  const onSelection = async () => {
    onSelect(selectedItems);
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
        items?.filter(({ searchString, name, id }) => {
          return (
            (searchString || name).toLowerCase().includes(normalizedQuery) ||
            isChecked(id)
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
              placeholder={searchBarPlaceholder}
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
                  checked={isChecked(item.id)}
                  onIonChange={onCheckboxChange}
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

export default IonAutocompleteSelectModalItem;
