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
  // === TODAY (2025-12-13)
  {
    id: 1, name: 'Salary', amount: 4500, date: '2025-12-13', type: 'income',
    category: { id: 100, name: 'Income', color: '#16A34A', icon: 'attach-money' }
  },

  {
    id: 2, name: 'Breakfast', amount: 120, date: '2025-12-13', type: 'expense',
    category: { id: 2, name: 'Food', color: '#3B82F6', icon: 'restaurant' }
  },

  {
    id: 3, name: 'Lunch', amount: 280, date: '2025-12-13', type: 'expense',
    category: { id: 2, name: 'Food', color: '#3B82F6', icon: 'restaurant' }
  },

  // === YESTERDAY (2025-12-12)
  {
    id: 4, name: 'Bus Fare', amount: 60, date: '2025-12-12', type: 'expense',
    category: { id: 3, name: 'Transport', color: '#22C55E', icon: 'directions-car' }
  },

  {
    id: 5, name: 'Fuel', amount: 350, date: '2025-12-12', type: 'expense',
    category: { id: 3, name: 'Transport', color: '#22C55E', icon: 'directions-car' }
  },

  {
    id: 6, name: 'Freelance UI Fix', amount: 1200, date: '2025-12-12', type: 'income',
    category: { id: 101, name: 'Freelance', color: '#22C55E', icon: 'work' }
  },

  // === LAST WEEK
  {
    id: 7, name: 'Groceries', amount: 640, date: '2025-12-10', type: 'expense',
    category: { id: 2, name: 'Food', color: '#3B82F6', icon: 'restaurant' }
  },

  {
    id: 8, name: 'Snacks', amount: 90, date: '2025-12-09', type: 'expense',
    category: { id: 2, name: 'Food', color: '#3B82F6', icon: 'restaurant' }
  },

  {
    id: 9, name: 'Electricity Bill', amount: 420, date: '2025-12-09', type: 'expense',
    category: { id: 4, name: 'Utilities', color: '#EAB308', icon: 'lightbulb-outline' }
  },

  {
    id: 10, name: 'Internet Bill', amount: 300, date: '2025-12-08', type: 'expense',
    category: { id: 4, name: 'Utilities', color: '#EAB308', icon: 'lightbulb-outline' }
  },

  {
    id: 11, name: 'Shopping', amount: 520, date: '2025-12-07', type: 'expense',
    category: { id: 1, name: 'Lifestyle', color: '#A855F7', icon: 'shopping-cart' }
  },

  // === OLDER
  {
    id: 12, name: 'Gym Fee', amount: 450, date: '2025-11-28', type: 'expense',
    category: { id: 7, name: 'Health', color: '#10B981', icon: 'health-and-safety' }
  },

  {
    id: 13, name: 'Medicine', amount: 180, date: '2025-11-25', type: 'expense',
    category: { id: 7, name: 'Health', color: '#10B981', icon: 'health-and-safety' }
  },

  {
    id: 14, name: 'Part-time Teaching', amount: 900, date: '2025-11-22', type: 'income',
    category: { id: 100, name: 'Income', color: '#16A34A', icon: 'attach-money' }
  },

  {
    id: 15, name: 'Movie Night', amount: 250, date: '2025-11-20', type: 'expense',
    category: { id: 1, name: 'Lifestyle', color: '#A855F7', icon: 'shopping-cart' }
  },

  {
    id: 16, name: 'Taxi', amount: 190, date: '2025-11-18', type: 'expense',
    category: { id: 3, name: 'Transport', color: '#22C55E', icon: 'directions-car' }
  },

  {
    id: 17, name: 'Freelance Bug Fix', amount: 700, date: '2025-11-15', type: 'income',
    category: { id: 101, name: 'Freelance', color: '#22C55E', icon: 'work' }
  }
]

export const ExpenseCategories: Category[] = [
  { id: 1, name: 'Lifestyle', color: '#A855F7', icon: 'shopping-cart' },
  { id: 2, name: 'Food', color: '#3B82F6', icon: 'restaurant' },
  { id: 3, name: 'Transport', color: '#22C55E', icon: 'directions-car' },
  { id: 4, name: 'Utilities', color: '#EAB308', icon: 'lightbulb-outline' },
  { id: 7, name: 'Health', color: '#10B981', icon: 'health-and-safety' },
  { id: 100, name: 'Income', color: '#16A34A', icon: 'attach-money' },
  { id: 101, name: 'Freelance', color: '#22C55E', icon: 'work' },
]