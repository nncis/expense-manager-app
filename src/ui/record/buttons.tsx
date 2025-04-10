import style from '@/styles/record.module.css'
import SubmitBtn from "./submitBtn"

export default function Buttons(){
  return (
  <div className={style.buttonsContainer}>
    <SubmitBtn className={style.addExpenseButton} type='submit'>Add Expense</SubmitBtn>
  </div>
  )
}