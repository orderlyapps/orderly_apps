import { format } from "date-fns";

export function formatDateForSMS(date: string): string {
  return format(date, "E d, MMM")
}

