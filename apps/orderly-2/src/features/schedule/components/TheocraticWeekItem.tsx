import { IonItem, IonItemDivider, IonLabel, IonText } from "@ionic/react";
import { formatToTheocraticWeek } from "../../../util/dates/formatToTheocraticWeek";
import { ComponentProps, Fragment } from "react";
import { format } from "date-fns";

export function TheocraticWeekItem({
  children,
  week: { week, date },
  index,
  onClick,
  ...props
}: ComponentProps<typeof IonItem> & {
  children: React.ReactNode;
  week: { week: string; date: Date };
  index: number;
  onClick?: () => void;
}) {
  return (
    <Fragment>
      {(date.getDate() <= 7 || index === 0) && (
        <IonItemDivider>
          <IonText>
            <h3>{format(date, "MMMM")}</h3>
          </IonText>
        </IonItemDivider>
      )}
      <IonItem onClick={onClick} {...props}>
        <IonLabel>
          <strong>{formatToTheocraticWeek(date)}</strong>
          {children}
        </IonLabel>
      </IonItem>
    </Fragment>
  );
}
