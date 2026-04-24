export type AddExpenseFormProps = {
  amount: number;
  category: string;
  description?: string;
  date: Date;
  requestId: string;
};

export type Expense = {
  id: string;
  amount: number;
  category: string;
  description?: string;
  date: Date;
  createdAt: Date;
};