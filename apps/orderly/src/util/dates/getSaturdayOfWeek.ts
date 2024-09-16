  export const getSaturdayOfWeek = (monday: string): string => {
    const date = new Date(monday);
    date.setDate(date.getDate() + 5);
    return date.toISOString().slice(0, 10);
  };
