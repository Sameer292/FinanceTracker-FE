type DateRange = {
  value: string,
  label: string
}

type CategorySelectProps = {
  selectedCategories: number[],
  setSelectedCategories: (selected: number[]) => void,
  ToggleItem: (Id: number) => void,
  selectAll: () => void
}

type MyExpenses = {
    id: number,
    name: string,
    amount: number,
    date: string,
    category: Category
}


type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
}
