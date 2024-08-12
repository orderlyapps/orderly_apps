import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { Suspense } from "react";
import { useData } from "../../../data/zustand/useData";
import { PATHS } from "../../../app/generated/util/paths";
import { CongregationSelect } from "../components/CongregationSelect";

export default function CreateCongregationPage() {
  const router = useIonRouter();
  const [showLoading, hideLoading] = useIonLoading();
  const [toast] = useIonToast();
  const upsertTableData = useData.use.upsertTableData();

  const handleCreate = async () => {
    await showLoading();
    try {
      const { error } = await upsertTableData("congregations");
      console.log("error:", error)
      await hideLoading();
      if (error) throw error;
      router.push(PATHS.settings, "back");
    } catch (error) {
      await toast({
        message: "Sorry, something went wrong. Please try again.",
        duration: 2000,
        position: "bottom",
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={"Cancel"}></IonBackButton>
          </IonButtons>
          <IonTitle>Create Congregation</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleCreate}>
              <strong>Create</strong>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonSpinner />}>
        <CongregationSelect></CongregationSelect>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
