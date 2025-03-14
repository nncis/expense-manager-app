import style from '@/styles/resume.module.css';
import PieChart from '@/ui/resume/PieChart';

export default async function Resume({
  searchParams
}: {
  searchParams: Promise<{
    view?: string;
    year?: string;
  }>
}){

   //Data for pie Graph by month or week 
  const view =  (await searchParams)?.view || "month";

  return(
    <div className={style.dashboard}>
      <PieChart />
    </div>
  )
}