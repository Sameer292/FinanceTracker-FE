export function splitByDateRanges<T>(data: { date: string }[]): { today: T[], yesterday: T[], lastWeek: T[] } {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - 7);

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const todayArray: any[] = [];
  const yesterdayArray: any[] = [];
  const lastWeekArray: any[] = [];

  data.forEach(item => {
    const itemDate = new Date(item.date);

    if (isSameDate(itemDate, today)) {
      todayArray.push(item);
    } else if (isSameDate(itemDate, yesterday)) {
      yesterdayArray.push(item);
    } else if (itemDate >= lastWeekStart && itemDate < yesterday) {
      lastWeekArray.push(item);
    }
  });

  return {
    today: todayArray,
    yesterday: yesterdayArray,
    lastWeek: lastWeekArray
  };
}
