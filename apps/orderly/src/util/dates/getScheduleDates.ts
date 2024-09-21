import {
  addWeeks,
  eachWeekOfInterval,
  formatDate,
  previousMonday,
  subWeeks,
} from "date-fns";

export const getScheduleDates = ({
  pastWeeks = 0,
  futureWeeks = 26,
}: {
  pastWeeks?: number;
  futureWeeks?: number;
} = {}) => {
  const result = eachWeekOfInterval(
    {
      start: subWeeks(previousMonday(new Date()), pastWeeks),
      end: addWeeks(previousMonday(new Date()), futureWeeks - 1),
    },
    { weekStartsOn: 1 }
  ).map((date) => {
    return {
      week: formatDate(date, "yyyy-MM-dd"),
      date,
    };
  });

  return result;
};
