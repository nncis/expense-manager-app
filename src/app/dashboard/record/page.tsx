import RecordForm from '@/ui/record/recordForm';
import style from '@/styles/record.module.css'

export default function Record(){
  return (
    <main className={style.recordMainPage}>
      <RecordForm />
    </main>
  )
}