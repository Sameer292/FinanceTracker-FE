type TransactionTypeSelect = {
	value: string;
	label: string;
	icon?: string;
	textColor?: string;
	bgColor?: string;
};

type transactionTypes = "income" | "expense";

type CategorySelectProps = {
	selectedItems: number[];
	setSelectedItems: (selected: number[]) => void;
	ToggleItem: (Id: number) => void;
	selectAll: () => void;
	removeAll: () => void;
	itemslength: number;
	items: {
		id: number;
		name: string;
		color: string;
		icon?: string;
	}[];
	title: string;
};

type TransactionType = {
	id: number;
	note: string;
	amount: number;
	transaction_date: string;
	category_id: number;
	transaction_type: transactionTypes;
};

type Category = {
	id: number;
	name: string;
	color: string;
	icon: string;
};

type createCategory = Omit<Category, "id">;

type TransactionCardType = {
	note: string;
	amount: number;
	currency: string;
	transaction_date: string;
	category_id?: number;
	transaction_type: transactionTypes;
};

type User = {
	id: number;
	name: string;
	email: string;
	current_balance: number;
	total_transactions: number;
	total_expenses: number;
	total_income: number;
};

type LoginInput = {
	email: string;
	password: string;
};

type RegisterInput = {
	name: string;
	email: string;
	password: string;
};

type changePassword = {
	current_password: string;
	new_password: string;
};
