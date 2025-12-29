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
type TopTransactionsResult = {
  chartData: pieDataItem[];
  topCategories: Category[];
};
export function getTopCategories(
  transactions: TransactionType[],
  limit = 4,
  categories: Category[]
): TopTransactionsResult {

  const expenseTotals: Record<number, number> = {}

  // sum by category
  transactions.forEach(tx => {
    if (tx.transaction_type === "expense") {
      expenseTotals[tx.category_id] =
        (expenseTotals[tx.category_id] || 0) + tx.amount
    }
  })

  // convert to array
  const categoryTotals = Object.entries(expenseTotals).map(([catId, amount]) => ({
    categoryId: Number(catId),
    amount,
  }))

  // sort desc
  categoryTotals.sort((a, b) => b.amount - a.amount)

  const top = categoryTotals.slice(0, limit)
  const rest = categoryTotals.slice(limit)

  const chartData: pieDataItem[] = top.map(item => {
    const cat = categories.find(c => c.id === item.categoryId)

    return {
      value: item.amount,
      text: cat?.name ?? 'Unknown',
      color: cat?.color ?? '#999',
      category: cat,
    } as pieDataItem
  })

  const othersTotal = rest.reduce((s, x) => s + x.amount, 0)

  if (othersTotal > 0) {
    chartData.push({
      value: othersTotal,
      text: "Others",
      color: "#64748B",
    })
  }

  const topCategories = top.map(t =>
    categories.find(c => c.id === t.categoryId) as Category
  )

  return { chartData, topCategories }
}

export function formatDate(date: Date): string {
  const day = date.getDate();

  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";

  const weekday = date.toLocaleString("en-US", { weekday: "short" });
  const month = date.toLocaleString("en-US", { month: "short" });

  return `${weekday}, ${day}${suffix} ${month}`;
}