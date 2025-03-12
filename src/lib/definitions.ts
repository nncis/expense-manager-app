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
  "Greengrocery", "Bakery", "Meat", "Transportation", "Barber Shop", "Clothing Store", "Services", "Supermarket", "Vacations", "Forniture" ,"Electronic", "Others"
].sort();