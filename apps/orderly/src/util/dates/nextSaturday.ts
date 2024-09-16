import { format, nextSaturday as _nextSaturday } from "date-fns";

export const nextSaturday = (monday: string): string => {
  return format(_nextSaturday(monday), "yyyy-MM-dd");
};
