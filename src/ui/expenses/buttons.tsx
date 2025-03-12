import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteExpense } from '@/lib/actions';
import style from '@/styles/expenses.module.css';

export function UpdateExpense({ id }: { id: string }){
  return(
  <Link
    href={`/dashboard/expenses/${id}/edit`}
    className={style.btn}
  >
    <PencilIcon width={20}/>
  </Link>
  )
};

export function DeleteExpense({ id }: { id: string }){
  const deleteExpenseWithId = deleteExpense.bind(null, id)
  return(
    <form 
      action={deleteExpenseWithId}
      >
      <button  type="submit"
      className={style.btn}
      
      >
        <TrashIcon width={20}></TrashIcon>
      </button>
    </form>
  )
};