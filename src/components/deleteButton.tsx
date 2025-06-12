'use client'

import ConfirmationDialog from "./confimationDialog";
import {TrashIcon } from '@heroicons/react/24/outline';
import { useState } from "react";
import { deleteExpense } from '@/lib/actions';

export default function DeleteButton(id: any){
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteExpense(id)
  }

  return (
    <div>
      <button onClick={() => setIsDialogOpen(true)}>
        <TrashIcon width={20}/>
      </button>
      <ConfirmationDialog 
        isOpen={isDialogOpen}
        message="Delete?"
        onConfirm={handleDelete}
        onCancel={() => setIsDialogOpen(false)}
      /> 
    </div>
  )
}