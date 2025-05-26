import { z } from 'zod';

export const createExpenseSchema = z.object({
  id: z.string(),
  category: z.string({
    invalid_type_error: 'Please select a category.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  date: z.string(),
  // userId: z.string()
});

export type State = {
  errors?: {
    category?: string[];
    amount?: string[];
  };
  message?: string | null;
};

export const categories: string[] = [
  "Greengrocery", "Fast Food", "Bakery", "Meat", "Transportation", "Hair salon", "Clothing Store", "Services", "Supermarket", "Vacations", "Forniture" ,"Electronic", "Others", "Grocery Store", "Pharmacy", "Hardware Store" 
].sort();

export type Expense = {
  id: string,
  category: string,
  amount: number,
  date: string,
  userId: string
};

export type ExpenseAmountByDate = {
  category: string;
  amount: number;
};

export type ExpenseTotalAmountPerMonth = {
  month: string;
  total: number;
};

export type ExpenseByDate = {
  category: string;
  amount: number;
  date: Date;
};

export type MonthlyTotal = {
  month: string;
  total: number;
};

export type GraphData = {
  date: string;
  total: number;
}