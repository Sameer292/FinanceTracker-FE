type DateRange = {
  value: string,
  label: string
}

type transactionTypes = 'expense' | 'income'

type CategorySelectProps = {
  selectedCategories: number[],
  setSelectedCategories: (selected: number[]) => void,
  ToggleItem: (Id: number) => void,
  selectAll: () => void
  removeAll: () => void
  categorieslength: number
}

type TransactionType = {
    id: number,
    name: string,
    amount: number,
    date: string,
    category: Category
    type: transactionTypes
}


type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
}


type TransactionCardType = {
  name: string,
  amount: number,
  currency: string,
  date: string,
  category?: Category,
  type: transactionTypes
}
