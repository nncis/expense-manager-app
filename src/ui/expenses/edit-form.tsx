'use client'

import style from '@/styles/record.module.css';
import { SetStateAction, useState } from 'react';
import { updateExpense } from '@/lib/actions';
import { State } from '@/lib/definitions';
import Link from 'next/link';
import Button from '../record/submitBtn';
import { useActionState } from 'react';
import { categories, Expense } from '@/lib/definitions';

export default function EditForm(
  { expense, id }: { expense: Expense, id: string }) {

  //set default values
  const date = new Date(expense.date);
  const formatDate = date.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(formatDate);

  //handling errors
  const initialState: State = { message: null, errors: {} };
  const updateExpenseWithId = updateExpense.bind(null, id);
  const [state, formAction] = useActionState(updateExpenseWithId, initialState)

  const handleDateChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedDate(event.target.value);
  };


  return (
    <form className={style.recordForm} action={formAction}>
      {/* choose category */}
      <div className={style.recordFormRow}>
        <label>
          Select Category
        </label>
        <select
          className={style.recordFormInput}
          id='category'
          name='category'
          defaultValue={expense.category}
        >
          <option value='' disabled>
            Select Category
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      {/* show category message error */}
      <div id='category-edit-error' aria-live="polite" aria-atomic="true">
          {state.errors?.category &&
          state.errors.category.map((error: string) =>
          <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
          )}
      </div>
      {/* input amount */}
      <div className={style.recordFormRow}>
        <label htmlFor="amount">
          Amount
        </label>
        <div>
          <input
            id="amount"
            name="amount"
            type="number"
            defaultValue={expense.amount}
            className={style.recordFormInput}
            placeholder="Enter amount"
            step="0.01"
          />
        </div>
      </div>
      {/* show amount error message */}
      <div id='amount-edit-error' aria-live="polite" aria-atomic="true">
          {state.errors?.amount &&
          state.errors.amount.map((error: string) =>
          <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
          )}
      </div>
      {/* date */}
      <div>
        <label htmlFor="date">
          Date
        </label>
        <div>
          <input
            id='date'
            name='date'
            type='date'
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>
      </div>

      <div>
        <Link
          href="/home/expense"
          className={style.btn}
        >
          Cancel
        </Link>
        <Button type='submit'>
          Edit Expense
        </Button>
      </div>
    </form>
  )
}