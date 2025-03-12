'use client'

import { createExpense } from '@/lib/actions';
import { useActionState } from 'react';
import { categories, State } from '@/lib/definitions';
import style from '@/styles/record.module.css';
import Buttons from '@/ui/record/buttons';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createExpense, initialState)

  return (
    <form className={style.recordForm} action={formAction}>
        {/* input name product
        <div className={style.recordFormRow}>
          <label>
            Product name:
          </label>
          <div>
            <input
              id="productName"
              className={style.recordFormInput}
              name="productName"
              type="text"
              placeholder="Enter name product"
            ></input>
          </div>
        </div> */}
        {/* choose category */}
        <div className={style.recordFormRow}>
          <label>
            Select Category
          </label>
          <select 
            id='category'
            name='category'
            defaultValue=''
            aria-describedby="expense-error"
          >
            <option value='' disabled>
              Select Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        {/* show category error message */}
        <div id='category-error' aria-live="polite" aria-atomic="true">
            {state.errors?.category &&
              state.errors.category.map((error: string) => 
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
              )}
        </div>
        {/* input amount */}
        <div className={style.recordFormRow}>
          <label htmlFor="">
            Amount
          </label>
          <div>
            <input
              id="amount"
              name="amount" 
              type="number"
              placeholder="Enter amount"
              step="0.01"
              />
          </div>
        </div>
        {/* show amount error message */}
        <div id='amount-error' aria-live="polite" aria-atomic="true">
          {state.errors?.amount &&
            state.errors.amount.map((error: string) =>
            <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            )}
        </div>
        <Buttons></Buttons>
    </form>
  )
}