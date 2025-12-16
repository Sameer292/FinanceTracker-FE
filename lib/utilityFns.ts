import { pieDataItem } from "react-native-gifted-charts";

export function splitByDateRanges<T extends TransactionType>(data: T[]): { today: T[], yesterday: T[], lastWeek: T[] } {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - 7);

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const todayArray: T[] = [];
  const yesterdayArray: T[] = [];
  const lastWeekArray: T[] = [];

  data.forEach(item => {
    const itemDate = new Date(item.transaction_date);

    if (isSameDate(itemDate, today)) {
      todayArray.push(item);
    } else if (isSameDate(itemDate, yesterday)) {
      yesterdayArray.push(item);
    } else if (itemDate >= lastWeekStart && itemDate < yesterday) {
      lastWeekArray.push(item);
    }
  });

  return {
    today: todayArray.reverse(),
    yesterday: yesterdayArray.reverse(),
    lastWeek: lastWeekArray.reverse()
  };
}

export type TopTransactionsResult = {
  chartData: pieDataItem[]
};

export function getTopTransactionsWithCategories(
  transactions: TransactionType[],
  limit = 4,
  categories: Category[]
): TopTransactionsResult {
  const expenses = transactions
    .filter(t => t.transaction_type === 'expense')
    .sort((a, b) => b.amount - a.amount);

  const category = categories.find(c => c.id === expenses[0].category_id);
  const top = expenses.slice(0, limit);
  const rest = expenses.slice(limit);

  const chartData: pieDataItem[] = top.map(tx => ({
    value: tx.amount,
    color: category?.color,
    text: category?.name,
  }))

  const othersTotal = rest.reduce((sum, tx) => sum + tx.amount, 0);

  if (othersTotal > 0) {
    chartData.push({
      value: othersTotal,
      text: 'Others',
      color: '#64748B',
    } as pieDataItem);
  }

  return { chartData };
}
