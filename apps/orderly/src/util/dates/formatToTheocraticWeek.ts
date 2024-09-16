export const formatToTheocraticWeek = (dateString: string): string => {
  const date = new Date(Date.parse(dateString));
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
  const end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
  const startMonth = start.toLocaleString('default', { month: 'short' });
  const endMonth = end.toLocaleString('default', { month: 'short' });
  const startDay = start.toLocaleString('default', { day: 'numeric' });
  const endDay = end.toLocaleString('default', { day: 'numeric' });

  return startMonth === endMonth
    ? `${startMonth} ${startDay} - ${endDay}`
    : `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
};
