import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { Suspense, useEffect, useState } from "react";
import { CongregationDetails } from "../components/CongregationDetails";
import { useSessionQuery } from "../../auth/queries/useSession";
import { useStore } from "../../../data/zustand/useStore";
import {
  useCongregationQuery,
  useUpsertCongregationMutation,
} from "../queries/useCongregations";
import { usePublisherQuery } from "../../people/queries/usePeople";
import { RouteComponentProps, useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../ui/LoadingSpinner";

interface UserDetailPageProps
  extends RouteComponentProps<{
    congregation_id?: string;
  }> {}

export default function CongregationDetailsPage({
  match,
}: Partial<UserDetailPageProps>) {
  const params: { congregation_id?: string } = useParams();
  console.log("kjb:", params);
  const [readonly, setReadonly] = useState(true);
  const session = useSessionQuery();
  const online = useStore.use.online();
  const user = usePublisherQuery(session.data?.user.id);
  const congregationDetails = useStore.use.congregationDetails();
  const { data: congregation } = useCongregationQuery(params.congregation_id);
  const { mutate: upsertCongregationMutation, error } =
    useUpsertCongregationMutation();
  const setStoreProperties = useStore.use.setStoreProperties();

  const [toast] = useIonToast();
  const [showLoading, hideLoading] = useIonLoading();

  const handleUpdate = async () => {
    await showLoading();
    try {
      upsertCongregationMutation(congregationDetails);
      await hideLoading();
      if (error) throw error;
      setReadonly(true);
    } catch (error) {
      toast({
        message: "Sorry, something went wrong. Please try again.",
        duration: 2000,
        position: "bottom",
      });
    }
  };
  function handleCancel(): void {
    if (congregation) {
      setStoreProperties("congregationDetails", congregation);
    }
    setReadonly(true);
  }

  useEffect(() => {
    console.log("match:", match?.params);
    if (congregation) {
      setStoreProperties("congregationDetails", congregation);
    }
  }, [match]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {readonly && <IonBackButton></IonBackButton>}
            {!readonly && <IonButton onClick={handleCancel}>Cancel</IonButton>}
          </IonButtons>
          <IonTitle>{congregationDetails?.name}</IonTitle>
          {user.data?.is_admin && (
            <IonButtons slot="end">
              {readonly && (
                <IonButton
                  onClick={() => setReadonly(false)}
                  disabled={!online}
                >
                  <strong>Edit</strong>
                </IonButton>
              )}
              {!readonly && (
                <IonButton onClick={handleUpdate} disabled={!online}>
                  <strong>Done</strong>
                </IonButton>
              )}
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner />}>
          <CongregationDetails readonly={readonly}></CongregationDetails>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
