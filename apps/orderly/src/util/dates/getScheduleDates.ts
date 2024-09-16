export const getScheduleDates = (startDate: string): string[] => {
  const dates: string[] = [];
  const start = new Date(startDate);
  for (let i = 0; i < 26; i++) {
    const date = new Date(start.getTime());
    date.setDate(date.getDate() + i * 7);
    dates.push(date.toISOString().slice(0, 10));
  }
  return dates;
};
