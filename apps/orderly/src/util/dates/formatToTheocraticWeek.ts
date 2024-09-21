import { addDays, format } from "date-fns";

export const formatToTheocraticWeek = (date: Date): string => {
  const endDate = addDays(date, 6);

  const start = format(date, "MMM dd - ");
  const end = format(endDate, endDate.getDate() <= 7 ? "MMM dd" : "dd");

  const result = start + end;

  return result;
};
