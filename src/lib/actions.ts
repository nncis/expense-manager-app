'use server'

import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getServerSession } from "next-auth/next";
import { createExpenseSchema, State } from '@/lib/definitions';
import { authOptions } from '@/lib/auth';

const CreateExpense = createExpenseSchema.omit({ id: true, date: true });

export async function createExpense(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateExpense.safeParse({
    category: formData.get('category'),
    amount: formData.get('amount'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Expense.',
    };
  }

  // Prepare data for insertion into the database
  const { category, amount } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Authenticate user
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    throw new Error('Not Authenticated.');
  }

  // Insert data into the database
  try {
    await sql`
      INSERT INTO expenses (id, category, amount, date, user_id)
      VALUES ( gen_random_uuid(), ${category}, ${amountInCents}, ${date}, (SELECT id FROM "User" WHERE email = ${user.email}))
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Create Expense.' };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/record');
  redirect('/dashboard/record');
};

export async function deleteExpense(id: string) {
  try {
    await sql `DELETE FROM expenses WHERE id = ${id}`;
    revalidatePath('/dashboard/expense');
    // return { message: 'Deleted Expense.' };
  } catch (error) {
    // return { message: 'Database Error: Failed to Delete Expense.' };
    console.log('Database Error: Failed to Delete Expense.', error)
  }
};

const UpdateExpense = createExpenseSchema.omit({ id: true });

export async function updateExpense(id: string, prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = UpdateExpense.safeParse({
    category: formData.get('category'),
    amount: formData.get('amount'),
    date: formData.get('date'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Expense.',
    };
  };

  // Prepare data for insertion into the database
  const { category, amount, date } = validatedFields.data;
  const amountInCents = amount * 100;

   //authenticate user
  
   const session = await getServerSession(authOptions);
   const user = session?.user;

  // Insert data into the database

  if(user){
    try {
      await sql `
        UPDATE expenses
        SET category = ${category}, amount = ${amountInCents}, date = ${date}
        WHERE id = ${id}
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Expense.'};
    }
  } else {
    throw new Error('Not Authenticate.');
  }
  revalidatePath('/dashboard/expenses');
  redirect('/dashboard/expenses');
};