export const expense = [
  {
    id: 1,
    name: 'Shopping',
    amount: 493.60,
    color: '#A855F7',
    date: '2022-01-01'
  },
  {
    id: 2,
    name: 'Food',
    amount: 308.50,
    color: '#3B82F6',
    date: '2022-02-01'
  },
  {
    id: 3,
    name: 'Transport',
    amount: 246.80,
    color: '#22C55E',
    date: '2022-03-01'
  },
  {
    id: 4,
    name: 'Bills',
    amount: 185.10,
    color: '#EAB308',
    date: '2022-04-01'
  }
]
export const MyTransactions: TransactionType[] = [
  // === TODAY (2025-12-14)
  {
    id: 1,
    name: 'Freelance Payment',
    amount: 200000,
    date: '2025-10-14',
    type: 'income',
    category: { id: 101, name: 'Freelance', color: '#16A34A', icon: 'work' }
  },
  {
    id: 2,
    name: 'Breakfast',
    amount: 18000,
    date: '2025-12-14',
    type: 'expense',
    category: { id: 2, name: 'Food', color: '#3B82F6', icon: 'restaurant' }
  },

  // === YESTERDAY (2025-12-13)
  {
    id: 3,
    name: 'Salary',
    amount: 100000,
    date: '2025-12-13',
    type: 'income',
    category: { id: 100, name: 'Income', color: '#16A34A', icon: 'attach-money' }
  },
  // === LAST WEEK
  {
    id: 5,
    name: 'Fuel',
    amount: 500,
    date: '2025-12-11',
    type: 'expense',
    category: { id: 3, name: 'Transport', color: '#22C55E', icon: 'directions-car' }
  },
  {
    id: 7,
    name: 'Freelance UI Fix',
    amount: 1200,
    date: '2025-12-09',
    type: 'income',
    category: { id: 101, name: 'Freelance', color: '#22C55E', icon: 'work' }
  },

  // === OLDER
  {
    id: 8,
    name: 'Internet Bill',
    amount: 300,
    date: '2025-12-05',
    type: 'expense',
    category: { id: 4, name: 'Utilities', color: '#EAB308', icon: 'lightbulb-outline' }
  },
  {
    id: 9,
    name: 'Movie Night',
    amount: 250,
    date: '2025-12-02',
    type: 'expense',
    category: { id: 1, name: 'Lifestyle', color: '#A855F7', icon: 'shopping-cart' }
  }
]
export const ExpenseCategories: Category[] = [
  {
    id: 1,
    name: 'Lifestyle',
    color: '#A855F7',
    icon: 'shopping-cart',
  },
  {
    id: 2,
    name: 'Food',
    color: '#3B82F6',
    icon: 'restaurant',
  },
  {
    id: 3,
    name: 'Transport',
    color: '#22C55E',
    icon: 'directions-car',
  },
  {
    id: 4,
    name: 'Utilities',
    color: '#EAB308',
    icon: 'lightbulb-outline',
  },
  {
    id: 7,
    name: 'Health',
    color: '#10B981',
    icon: 'health-and-safety',
  },
  {
    id: 100,
    name: 'Salary',
    color: '#16A34A',
    icon: 'attach-money',
  },
  {
    id: 101,
    name: 'Freelance',
    color: '#16A34A',
    icon: 'work',
  },
]
