export const RecentExpenses = [
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


export const MyExpenses: MyExpenses[] = [
    // === TODAY (2025-12-11) ===
    {
        id: 1, name: 'Shopping', amount: 493.60, date: '2025-12-11',
        category: { id: 1, name: 'Lifestyle', color: '#A855F7', icon: 'shopping-cart' }
    },
    {
        id: 2, name: 'Food', amount: 308.50, date: '2025-12-11',
        category: { id: 2, name: 'Food', color: '#3B82F6', icon: 'restaurant' }
    },
    {
        id: 3, name: 'Transport', amount: 246.80, date: '2025-12-11',
        category: { id: 3, name: 'Transport', color: '#22C55E', icon: 'directions-car' }
    },

    // === YESTERDAY (2025-12-10) ===
    {
        id: 4, name: 'Bills', amount: 185.10, date: '2025-12-10',
        category: { id: 4, name: 'Utilities', color: '#EAB308', icon: 'lightbulb-outline' }
    },
    {
        id: 5, name: 'Entertainment', amount: 529.20, date: '2025-12-10',
        category: { id: 5, name: 'Entertainment', color: '#EF4444', icon: 'movie' }
    },
    {
        id: 6, name: 'Groceries', amount: 342.30, date: '2025-12-10',
        category: { id: 2, name: 'Food', color: '#3B82F6', icon: 'restaurant' }
    },

    // === LAST WEEK (2025-12-04 → 2025-12-09) ===
    {
        id: 7, name: 'Travel', amount: 789.10, date: '2025-12-09',
        category: { id: 6, name: 'Travel', color: '#8B5CF6', icon: 'flight' }
    },
    {
        id: 8, name: 'Fuel', amount: 210.75, date: '2025-12-07',
        category: { id: 3, name: 'Transport', color: '#22C55E', icon: 'directions-car' }
    },
    {
        id: 9, name: 'Medicine', amount: 156.40, date: '2025-12-06',
        category: { id: 7, name: 'Health', color: '#10B981', icon: 'health-and-safety' }
    },
    {
        id: 10, name: 'Subscriptions', amount: 99.99, date: '2025-12-04',
        category: { id: 5, name: 'Entertainment', color: '#EF4444', icon: 'movie' }
    },

    // === OLDER (before last week) ===
    {
        id: 11, name: 'Gym', amount: 450.00, date: '2025-11-20',
        category: { id: 7, name: 'Health', color: '#10B981', icon: 'health-and-safety' }
    },
    {
        id: 12, name: 'Maintenance', amount: 620.80, date: '2025-11-01',
        category: { id: 4, name: 'Utilities', color: '#EAB308', icon: 'lightbulb-outline' }
    },
    {
        id: 13, name: 'Gadgets', amount: 1299.00, date: '2025-10-15',
        category: { id: 1, name: 'Lifestyle', color: '#A855F7', icon: 'shopping-cart' }
    },
    {
        id: 14, name: 'Snacks', amount: 78.20, date: '2025-10-01',
        category: { id: 2, name: 'Food', color: '#3B82F6', icon: 'restaurant' }
    },
    {
        id: 15, name: 'Books', amount: 230.50, date: '2025-09-20',
        category: { id: 8, name: 'Education', color: '#84CC16', icon: 'menu-book' }
    }
];


export const ExpenseCategories: Category[] = [
    { id: 1, name: 'Lifestyle', color: '#A855F7', icon: 'shopping-cart' },
    { id: 2, name: 'Food', color: '#3B82F6', icon: 'restaurant' },
    { id: 3, name: 'Transport', color: '#22C55E', icon: 'directions-car' },
    { id: 4, name: 'Utilities', color: '#EAB308', icon: 'lightbulb-outline' },
    { id: 5, name: 'Entertainment', color: '#EF4444', icon: 'movie' },
    { id: 6, name: 'Travel', color: '#8B5CF6', icon: 'flight' },
    { id: 7, name: 'Health', color: '#10B981', icon: 'health-and-safety' },
    { id: 8, name: 'Education', color: '#84CC16', icon: 'menu-book' }
];
