import style from '@/styles/resume.module.css';
import PieChart from '@/ui/resume/PieChart';
import BarChart from '@/ui/resume/barChart';
import { getYears } from '@/lib/data';

export default async function Resume({
  searchParams
}: {
  searchParams: Promise<{
    view?: string;
    year?: string;
  }>
}){

  //  //Data for pie Graph by month or week 
  // const view =  (await searchParams)?.view || "month";

    //Data for  Graph by years
    const yearsData = await getYears(); //get years from expenses to make the <select> options
    const selectYears = yearsData.map(year => year.year);

  return(
    <div className={style.dashboard}>
      <PieChart />
      <BarChart selectYears={selectYears} />
    </div>
  )
}