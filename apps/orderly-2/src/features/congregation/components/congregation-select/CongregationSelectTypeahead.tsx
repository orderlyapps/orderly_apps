import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { useStore } from "../../../../data/zustand/useStore";
import { useUpsertCongregationMutation } from "../../queries/useCongregations";

export interface Item {
  name: string;
  id: string;
}

interface TypeaheadProps {
  items: Item[];
  title?: string;
  onCancel?: () => void;
  onSelection: (items: string) => void;
  value?: string;
}

const MINIMUM_CONGREGATION_NAME_LENGTH = 3;

const shouldShowCreateCongregation = (
  admin_count: number | null,
  search_query: string
) => {
  if (search_query.length <= MINIMUM_CONGREGATION_NAME_LENGTH) return false;

  if (admin_count !== null && admin_count >= 3) return false;

  return true;
};

function CongregationSelectTypeahead(props: TypeaheadProps) {
  const [filteredItems, setFilteredItems] = useState<Item[]>([...props.items]);
  const [selectedItem, setSelectedItem] = useState<string>(props.value || "");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { admin_count } = useStore.use.personDetails();
  const setStoreProperties = useStore.use.setStoreProperties();
  const { mutateAsync: upsertCongregation } = useUpsertCongregationMutation();

  const [toast] = useIonToast();
  const [showLoading, hideLoading] = useIonLoading();

  const onSelectClick = async () => {
    await showLoading();
    try {
      let congregation_id = selectedItem;
      let congregation_name = props.items.find(
        (item: { id: string }) => item.id === selectedItem
      )?.name;

      if (selectedItem === "new") {
        congregation_id = crypto.randomUUID();
        congregation_name = searchQuery;
        await upsertCongregation({
          id: congregation_id,
          name: congregation_name,
        });
      }

      setStoreProperties("personDetails", {
        congregation_id,
        congregation_name,
      });
      await hideLoading();
      props.onSelection(selectedItem);
    } catch (error) {
      await hideLoading();
      toast({
        message: "Sorry, something went wrong. Please try again.",
        duration: 2000,
        position: "bottom",
      });
    }
  };

  const searchbarInput = (ev: any) => {
    setSearchQuery(ev.target.value);
    filterList(ev.target.value);
  };

  const filterList = (searchQuery: string | null | undefined) => {
    if (searchQuery === undefined || searchQuery === null) {
      setFilteredItems([...props.items]);
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      setFilteredItems(
        props.items.filter((item) => {
          return (
            item.name.toLowerCase().includes(normalizedQuery) ||
            selectedItem === item.id
          );
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
              disabled={
                selectedItem === "" ||
                (searchQuery === "" && selectedItem === "new")
              }
              onClick={onSelectClick}
            >
              <strong>{selectedItem === "new" ? "Create" : "Select"}</strong>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            placeholder={`Search ${shouldShowCreateCongregation(admin_count, searchQuery) ? "for or create congregation" : "congregations"}`}
            onIonInput={searchbarInput}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light" class="ion-padding">
        {shouldShowCreateCongregation(admin_count, searchQuery) && (
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
export default CongregationSelectTypeahead;
