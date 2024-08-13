import { IonItem, IonLabel, IonModal } from "@ionic/react";
import { useEffect, useState } from "react";
import { chevronExpandOutline } from "ionicons/icons";
import { useStore } from "../../../data/zustand/useStore";
import AppTypeahead from "./AppTypeahead";
import { useCongregationsQuery } from "../queries/useCongregations";

export function CongregationSelect({
  readonly = false,
}: {
  readonly?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const online = useStore.use.online();
  const { data: congregations } = useCongregationsQuery();
  const user = useStore.use.user();

  const handleSelection = (fruits: string) => {
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
        {user.congregation_name}
      </IonItem>

      <IonModal isOpen={isOpen}>
        <AppTypeahead
          title="Select Congregation"
          items={congregations || []}
          onCancel={() => setIsOpen(false)}
          onSelection={handleSelection}
        />
      </IonModal>
    </>
  );
}
