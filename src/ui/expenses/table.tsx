import { fetchFilteredExpenses } from "@/lib/data";
import { formatDateToLocal, numberFormatter } from "@/lib/utils";
import { UpdateExpense, DeleteExpense } from "@/ui/expenses/buttons";
import style from '@/styles/expenses.module.css';

export default async function Table (
  {
    query, 
    currentPage,
  }:
  {
    query: string, 
    currentPage: number;
  }
){
  const expenses = await fetchFilteredExpenses(query, currentPage);

  return (
    <>
      <table className={style.expenseTable}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense, index) => 
            <tr key={index}>
              <td>{expense.category}</td>
              <td>${numberFormatter(expense.amount / 100)}</td>
              <td>{formatDateToLocal(expense.date)}</td>
              <td>
                <div className={style.expenseButtons}>
                  <UpdateExpense id={expense.id}/>
                  <DeleteExpense id={expense.id}/> 
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={style.mobileFormContainer}>
          {expenses?.map((expense, index) => 
            <div className={style.expenseRowMobileContainer} key={index}>
              <div className={style.expenseMobileContent}>
                <h3 className={style.expenseCategoryMobile}>{expense.category}</h3>
                <p className={style.expenseAmountMobile}>${numberFormatter(expense.amount / 100)}</p>
                <p className={style.expenseDateMobile}>{formatDateToLocal(expense.date)}</p>
              </div>
              <div className={style.expenseButtons}>
                <UpdateExpense id={expense.id}/>
                <DeleteExpense id={expense.id}/>
              </div>
            </div>
          )}
      </div>
    </>
  )
}


