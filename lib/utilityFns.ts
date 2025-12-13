import { pieDataItem } from "react-native-gifted-charts";

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

export type TopTransactionsResult = {
  chartData: pieDataItem[]
};

export function getTopTransactionsWithCategories(
  transactions: TransactionType[],
  limit = 4
): TopTransactionsResult {
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount);

  const top = expenses.slice(0, limit);
  const rest = expenses.slice(limit);

  const chartData: pieDataItem[] = top.map(tx => ({
    value: tx.amount,
    color: tx.category.color,
    text: tx.category.name,
    category: tx.category,
  }));

  const othersTotal = rest.reduce((sum, tx) => sum + tx.amount, 0);

  if (othersTotal > 0) {
    chartData.push({
      value: othersTotal,
      text: 'Others',
      color: '#64748B',
      category: {
        id: -1,
        name: 'Others',
        color: '#64748B',
        icon: 'more-horiz',
      },
    } as pieDataItem);
  }

  return { chartData };
}
