import { IonItem, IonLabel, IonModal } from "@ionic/react";
import { chevronExpandOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useStore } from "../../../../data/zustand/useStore";
import {
  useCongregationsQuery
} from "../../queries/useCongregations";
import CongregationSelectTypeahead from "./CongregationSelectTypeahead";

export function CongregationSelect({
  readonly = false,
}: {
  readonly?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const online = useStore.use.online();
  const { data: congregations } = useCongregationsQuery();
  const personDetails = useStore.use.personDetails();
  console.log("personDetails:", personDetails)

  const handleSelection = (id: string) => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!online) setIsOpen(false);
  }, [online]);

  return (
    <>
      <IonItem
        button={!readonly}
        detail={!readonly}
        detailIcon={chevronExpandOutline}
        onClick={() => setIsOpen(!readonly)}
      >
        <IonLabel>Congregation:</IonLabel>
        {personDetails.congregation_name}
      </IonItem>

      <IonModal isOpen={isOpen}>
        <CongregationSelectTypeahead
          title="Select Congregation"
          items={congregations || []}
          onCancel={() => setIsOpen(false)}
          onSelection={handleSelection}
          value={personDetails.congregation_id || ""}
        />
      </IonModal>
    </>
  );
}
