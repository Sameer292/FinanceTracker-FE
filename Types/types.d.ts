type DateRange = {
  value: string,
  label: string
}

type transactionTypes = 'income' | 'expense'

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
  note: string,
  amount: number,
  transaction_date: string,
  category_id: number,
  transaction_type: transactionTypes
}


type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
}


type TransactionCardType = {
  note: string,
  amount: number,
  currency: string,
  transaction_date: string,
  category_id?: number,
  transaction_type: transactionTypes
}

type User = {
  id: number,
  name: string,
  email: string,
  current_balance: number
}