import RecordForm from '@/ui/record/recordForm';
import style from '@/styles/record.module.css'

export default function Record(){
  return (
    <main className={style.recordMainPage}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>Add Expense</h1>
      </div>
      <div className={style.formContainer}>
        <RecordForm />
      </div>
    </main>
  )
}