'use client'
import Link from 'next/link';
import { PencilIcon, ExclamationCircleIcon , TrashIcon } from '@heroicons/react/24/outline';
import { deleteExpense } from '@/lib/actions';
import style from '@/styles/expenses.module.css';
import { useState } from 'react';

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
  const [showModal, setShowModal] = useState(false);
  const deleteExpenseWithId = deleteExpense.bind(null, id);

  return(
    <>
      <button  
        type="button"
        className={style.btn}
        onClick={() => setShowModal(true)}
        aria-label="Delete expense"
      >
        <TrashIcon width={20}></TrashIcon>
      </button>
      {showModal && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
          <div>
            <ExclamationCircleIcon  className={style.exclamationIcon}/>
          </div>
            <p>Are you sure you want to delete this expense?</p>
            <div className={style.modalButtons}>
              <form action={deleteExpenseWithId}>
                <button 
                  type='submit' 
                  className={style.confirmBtn}>
                  Confirm
                </button>
              </form>
              <button 
                onClick={() => setShowModal(false)} 
                className={style.cancelBtn}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
};